const Asset = require('../Models/assetModel');
const User = require('../Models/userModel');
const sharp = require('sharp')
const AdmZip = require('adm-zip');
const ffmpegStatic = require('ffmpeg-static');
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
const path = require("path")
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegStatic);
ffmpeg.setFfprobePath(ffprobePath);

exports.getAsset = async (req, res) => {
    const { Path } = req.body;
    res.sendFile(Path, { root: path.join(__dirname, '..') }, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error sending file');
        }
        console.log('File sent successfully');
    })
}
exports.getAssetById = async (req, res) => {
    const { assetId } = req.body;
    try {
        const asset = await Asset.find({ _id: assetId });
        await this.increaseViews(assetId, req._id)
        res.status(200).json(asset)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' });
    }
}
exports.getOriginalAsset = async (req, res) => {
    let { assets } = req.body;
    const allAssets = await Asset.find({ _id: { $in: assets } });
    const zip = new AdmZip();
    allAssets.map(asset => {
        zip.addLocalFile(asset.path.original.replace("\\", "/"));
    })
    const downloadName = `files.zip`;
    const data = zip.toBuffer();
    res.set('Content-Type', 'application/octet-stream');
    res.set('Content-Disposition', `attachment; filename=${downloadName}`);
    res.set('Content-Length', data.length);
    const user = await User.findByIdAndUpdate({ _id: req._id }, { $push: { downloads: { $each: assets } } }, { new: true })
    await this.increaseDownloads(req._id, assets)
    res.send(data);
}
const modfiyVideo = async (filePath, fileName) => {
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(filePath, (err, metadata) => {
            if (err) {
                console.error('Error getting video metadata:', err);
                res.status(500).send('Error processing video upload');
            } else if (metadata.streams && metadata.streams[0].bit_rate) {
                const originalBitrate = metadata.streams[0].bit_rate;
                const videoHeight = metadata.streams[0].height;
                const targetFontSize = Math.floor(videoHeight / 4);
                ffmpeg(filePath)
                    .videoCodec('libx264')
                    .videoBitrate(400)
                    .videoFilter(`drawtext=text=\'CLIQNCLIX\':fontsize=${targetFontSize}:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2:alpha=0.5`).videoCodec('libx264')
                    .output(`demo_uploads/${fileName}`)
                    .on('end', () => { console.log('Video processed with text overlay!'), resolve() })
                    .on('error', (err) => { console.error('Error:', err), reject() })
                    .run();
                console.log('Original bitrate:', originalBitrate);
            } else {
                console.error('Could not extract bitrate from video');
                res.status(500).send('Error processing video upload');
            }
        });
    })
}
exports.createAsset = async (req, res) => {
    const { name, description, tags, categories, price, currency, age, people, location, outfit, advertisement, gesture } = req.body;
    const filePath = req.file.path
    if (req.file.mimetype.split("/")[0] == 'image') {
        if (req.file.mimetype.split("/")[0] == 'image') {
            const imageData = await sharp(filePath).toBuffer();
            const imageMetaData = await sharp(imageData).metadata();
            const imageWidth = imageMetaData.width;
            const imageHeight = imageMetaData.height;
            const image = sharp(imageData);
            const textWidth = imageWidth * 0.8;
            const fontSize = textWidth / 8;
            const svgText = `
    <svg width="${imageWidth}" height="${imageHeight}">
      <style>
        .title {
          fill: rgba(0, 0, 0, 0.6); /* White with 0.4 opacity */
          font-size: ${fontSize}px;
          font-weight: bold;
          text-anchor: middle;
          dominant-baseline: middle;
        }
      </style>
      <text x="50%" y="50%" class="title" text-anchor="middle">Cliqnclix</text>
    </svg>`;

            const svgBuffer = Buffer.from(svgText);
            try {
                await image
                    .composite([
                        {
                            input: svgBuffer,
                            top: 0,
                            left: 0,
                        },
                    ])
                    .toFile(`demo_${filePath}`);
            } catch (error) {
                console.log(error);
            }
        }
    }
    else {
        await modfiyVideo(filePath, req.file.filename)
    }
    const metaData = { description, categories: categories.split(",").map(category => category.trim()), tags: tags.split(",").map(tag => tag.trim()), size: req.file.size, filters: { age, gesture, advertisement, location, people, outfit } }
    const creator = req._id
    const type = req.file.mimetype.split("/")[0]
    const path = { demo: "demo_" + filePath, original: filePath }
    console.log(currency, price, req.body)
    try {
        const asset = new Asset({ name, metaData, creator, type, path, price: { [currency]: Number(price) } });
        await asset.save();
        const update = { $push: { assets: asset._id } }
        const user = await User.findOneAndUpdate({ _id: req._id }, update, { new: true })
        console.log(user)
        res.status(201).json({ message: "Asset created successfully", asset });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.updateAsset = async (req, res) => {
    const filter = { _id: req.body.id };
    const update = req.body.update;
    const options = { new: true };
    try {
        const updatedAsset = Asset.findOneAndUpdate(filter, update, options)
        if (updatedAsset) {
            return res.status(200).json({ asset: updatedAsset });
        }
        else {
            return res.status(400).json({ message: "No asset found" });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}
exports.addReview = async (req, res) => {
    const { assetId, text, rating, email, name, website } = req.body.item;
    const filter = { _id: assetId };
    let update = { $push: { review: { userId: req._id, text, rating, email, name, website } } };
    const options = { new: true };
    console.log(req.body)
    try {
        const updatedAsset = await Asset.findOneAndUpdate(filter, update, options)
        if (updatedAsset) {
            return res.status(200).json({ updatedAsset });
        } else {
            return res.status(400).json({ message: "No user found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
exports.getAssetsByCategory = async (req, res) => {
    const { type, category, filters, page } = req.body
    const combinedFilter = {};
    if (filters.length) {
        filters.forEach(filter => {
            for (const key in filter) {
                if (key !== 'type' && filter[key].length > 0) {
                    combinedFilter[`metaData.filters.${key}`] = { $in: filter[key] };
                }
            }
        });
    }
    combinedFilter.type = type
    combinedFilter[`metaData.categories`] = { $in: [category] }
    try {
        const skip = (page - 1) * 10;
        const totalEntries = await Asset.countDocuments(combinedFilter);
        const assets = await Asset.find(combinedFilter).populate("creator").skip(skip).limit(10);
        res.json({ assets, totalEntries });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.increaseDownloads = async (userId, assets) => {
    const filter = { _id: { $in: assets } }
    const update = {
        $addToSet: {
            downloads: {
                userId,
                downloadedAt: new Date().getTime()
            }
        }
    }
    try {
        const updatedAsset = await Asset.updateMany(filter, update, options)
        if (updatedAsset) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return
    }
}
exports.increaseViews = async (assetId, userId) => {
    console.log(assetId, userId)
    const filter = { _id: assetId }
    const update = { $push: { views: { userId, viewedAt: new Date().getTime() } } }
    const options = { new: true };
    try {
        const updatedAsset = await Asset.findOneAndUpdate(filter, update, options)
        if (updatedAsset) {
            return true
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
exports.sortAssets = async (req, res) => {
    try {
        const assets = await Asset.find({ creator: req._id }).sort({ [req.body.sortBy]: -1 })
        if (assets) {
            return res.status(200).json({ assets });
        } else {
            return res.status(400).json({ message: "No asset found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
// const getFilteredAssets = async (filters, explicitFilter) => {
//     try {
//         const filterObj = {};
//         filters.forEach(filter => {
//             for (const key in filter) {
//                 if (key !== 'type' && filter[key].length > 0) {
//                     filterObj[`metaData.filters.${key}`] = { $in: filter[key] };
//                 }
//             }
//         });
//         if (explicitFilter && explicitFilter.type) {
//             filterObj.type = explicitFilter.type;
//         }
//         const filteredAssets = await Asset.find(filterObj);
//         return filteredAssets;
//     } catch (error) {
//         console.error('Error fetching filtered assets:', error);
//         throw error;
//     }
// };
// exports.getFilters = async (req, res) => {
//     try {
// const assets = await Asset.find().select("metaData.filters");
// const filters = {};
// assets.forEach(asset => {
//     const filters = asset.metaData.filters
//     if(filters){
//         for(let key in assetFilters){

//         }
//     }
// })
// Loop through each asset
// assets.forEach(asset => {
//     const metaData = asset.metaData;
//     const assetFilters = metaData.filters;
//     // console.log(assetFilters)
//     if (assetFilters) {
//         for (let key in assetFilters) {
//             const value = assetFilters[key];
//             console.log(value)
// if (Array.isArray(value)) {
//     // If it's an array, concatenate it with existing array or set it as new array
//    filters[key] = filters[key] ? [...new Set([...filters[key], ...value])] : [...new Set(value)];
// } else {
//     // If it's a string or other value, add it to the array or set it as a new array
//     filters[key] = filters[key] ? [...new Set([...filters[key], value])] : [value];
// }
// }
//     }
// });

//         const filtersArray = Object.keys(filters).map(key => {
//             return {
//                 name: key,
//                 options: filters[key]
//             };
//         });

//         res.json({ lol: "hehe" });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server Error' });
//     }
// }