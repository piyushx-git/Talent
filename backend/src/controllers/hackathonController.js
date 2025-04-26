import Hackathon from '../models/Hackathon.js';

// @desc    Get all hackathons
// @route   GET /api/hackathons
// @access  Public
export const getHackathons = async (req, res) => {
  try {
    const hackathons = await Hackathon.find()
      .populate('organizer', 'name email')
      .populate('teams', 'name status');
    res.json(hackathons);
  } catch (error) {
    console.error('Error fetching hackathons:', error);
    res.status(500).json({ message: 'Error fetching hackathons' });
  }
};

// @desc    Get single hackathon
// @route   GET /api/hackathons/:id
// @access  Public
export const getHackathon = async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id)
      .populate('organizer', 'name email')
      .populate('teams', 'name status');

    if (hackathon) {
      res.json(hackathon);
    } else {
      res.status(404).json({ message: 'Hackathon not found' });
    }
  } catch (error) {
    console.error('Error fetching hackathon:', error);
    res.status(500).json({ message: 'Error fetching hackathon' });
  }
};

// @desc    Create a hackathon
// @route   POST /api/hackathons
// @access  Private/Admin
export const createHackathon = async (req, res) => {
  try {
    const { title, description, startDate, endDate, maxParticipants } = req.body;

    const hackathon = await Hackathon.create({
      title,
      description,
      startDate,
      endDate,
      maxParticipants,
      organizer: req.user._id,
      status: 'pending'
    });

    if (hackathon) {
      res.status(201).json(hackathon);
    } else {
      res.status(400).json({ message: 'Invalid hackathon data' });
    }
  } catch (error) {
    console.error('Error creating hackathon:', error);
    res.status(500).json({ message: 'Error creating hackathon' });
  }
};

// @desc    Update a hackathon
// @route   PUT /api/hackathons/:id
// @access  Private/Admin
export const updateHackathon = async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id);

    if (hackathon) {
      hackathon.title = req.body.title || hackathon.title;
      hackathon.description = req.body.description || hackathon.description;
      hackathon.startDate = req.body.startDate || hackathon.startDate;
      hackathon.endDate = req.body.endDate || hackathon.endDate;
      hackathon.maxParticipants = req.body.maxParticipants || hackathon.maxParticipants;

      const updatedHackathon = await hackathon.save();
      res.json(updatedHackathon);
    } else {
      res.status(404).json({ message: 'Hackathon not found' });
    }
  } catch (error) {
    console.error('Error updating hackathon:', error);
    res.status(500).json({ message: 'Error updating hackathon' });
  }
};

// @desc    Delete a hackathon
// @route   DELETE /api/hackathons/:id
// @access  Private/Admin
export const deleteHackathon = async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id);

    if (hackathon) {
      await hackathon.deleteOne();
      res.json({ message: 'Hackathon removed' });
    } else {
      res.status(404).json({ message: 'Hackathon not found' });
    }
  } catch (error) {
    console.error('Error deleting hackathon:', error);
    res.status(500).json({ message: 'Error deleting hackathon' });
  }
};

// @desc    Approve a hackathon
// @route   PUT /api/hackathons/:id/approve
// @access  Private/Admin
export const approveHackathon = async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id);

    if (hackathon) {
      hackathon.status = 'approved';
      const updatedHackathon = await hackathon.save();
      res.json(updatedHackathon);
    } else {
      res.status(404).json({ message: 'Hackathon not found' });
    }
  } catch (error) {
    console.error('Error approving hackathon:', error);
    res.status(500).json({ message: 'Error approving hackathon' });
  }
};

// @desc    Reject a hackathon
// @route   PUT /api/hackathons/:id/reject
// @access  Private/Admin
export const rejectHackathon = async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id);

    if (hackathon) {
      hackathon.status = 'rejected';
      const updatedHackathon = await hackathon.save();
      res.json(updatedHackathon);
    } else {
      res.status(404).json({ message: 'Hackathon not found' });
    }
  } catch (error) {
    console.error('Error rejecting hackathon:', error);
    res.status(500).json({ message: 'Error rejecting hackathon' });
  }
}; 