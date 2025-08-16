import Task from '../models/Task.js';

export const createTask = async (req, res, next) => {
  try {
    const task = await Task.create({ ...req.body, user: req.userId });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status, q } = req.query;
    const filter = { user: req.userId };
    if (status) filter.status = status;
    if (q) filter.title = { $regex: q, $options: 'i' };

    const [items, total] = await Promise.all([
      Task.find(filter)
        .sort({ createdAt: -1 })
        .skip((+page - 1) * +limit)
        .limit(+limit),
      Task.countDocuments(filter)
    ]);

    res.json({
      items,
      page: +page,
      limit: +limit,
      total,
      pages: Math.ceil(total / +limit)
    });
  } catch (err) {
    next(err);
  }
};

export const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.userId });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const updated = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Task not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const deleted = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    });
    if (!deleted) return res.status(404).json({ message: 'Task not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
