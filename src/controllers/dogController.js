const Dog = require('../models/Dog');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Upload a dog picture
exports.uploadDogPicture = async (req, res) =>
{
    try {
        const { name } = req.body;
    
        if (!name || !req.file) {
            return res.status(400).json({ error: 'Name and image are required' });
        }
    
        // Ensure the uploadedImages directory exists
        const uploadDir = 'uploadedImages';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
    
        // Extract file extension
        const fileExtension = path.extname(req.file.originalname);
        const newFileName = `${name}${fileExtension}`;
        const newFilePath = path.join(uploadDir, newFileName);
    
        // Rename and move the uploaded file
        fs.renameSync(req.file.path, newFilePath);
    
        // Define a temporary path for processing
        const tempFilePath = path.join(uploadDir, `temp-${newFileName}`);
    
        // Compress image and save to a temporary file
        await sharp(newFilePath)
            .resize({ width: 800 })
            .jpeg({ quality: 80 })
            .toFile(tempFilePath);
    
        // Replace the original renamed file with the compressed one
        fs.renameSync(tempFilePath, newFilePath);
    
        // Save to database
        const dog = new Dog({ name, imageUrl: newFilePath });
        await dog.save();
        
        res.status(201).json(dog);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}    
// Fetch all dog pictures
exports.getAllDogs = async (req, res) =>
{
    try
    {
        const dogs = await Dog.find();
        res.json(dogs);
    } catch (err)
    {
        res.status(500).json({ error: err.message });
    }
};

// Fetch a specific dog picture
exports.getDogById = async (req, res) =>
{
    try
    {
        const dog = await Dog.findById(req.params.id);
        if (!dog) return res.status(404).json({ error: 'Dog not found' });
        res.sendFile(dog.imageUrl, { root: '.' });
    } catch (err)
    {
        res.status(500).json({ error: err.message });
    }
};

// Update a dog picture
exports.updateDogPicture = async (req, res) =>
{
    try
    {
        const dog = await Dog.findById(req.params.id);
        if (!dog) return res.status(404).json({ error: 'Dog not found' });
        const { name } = req.body
        // Compress and save new image
        const compressedPath = `uploadedImages/compressed-${ name || dog.name }.jpeg`;
        await sharp(req.file.path)
            .resize({ width: 800 })
            .jpeg({ quality: 80 })
            .toFile(compressedPath);
        fs.unlinkSync(dog.imageUrl);
        if (name)
        {
            dog.name = name
        }
        dog.imageUrl = compressedPath;
        await dog.save();
        res.json(dog);
    } catch (err)
    {
        res.status(500).json({ error: err.message });
    }
};

// Delete a dog picture
exports.deleteDogPicture = async (req, res) =>
{
    try
    {
        const dog = await Dog.findById(req.params.id);
        if (!dog) return res.status(404).json({ error: 'Dog not found' });

        // Delete file and metadata
        fs.unlinkSync(dog.imageUrl);
        await dog.deleteOne();
        res.json({ message: 'Dog image deleted' });
    } catch (err)
    {
        res.status(500).json({ error: err.message });
    }
};
