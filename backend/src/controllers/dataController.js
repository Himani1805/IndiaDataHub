import { fetchJsonData } from '../services/dataService.js';

export const getCatalogData = async (req, res) => {
  try {
    const data = await fetchJsonData('response1.json');
    // Extracting only the required fields as per instructions
    res.status(200).json({
      success: true,
      categories: data.categories,
      frequent: data.frequent,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getGlobalData = async (req, res) => {
  try {
    const data = await fetchJsonData('response2.json');
    res.status(200).json({
      success: true,
      categories: data.categories,
      frequent: data.frequent,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};