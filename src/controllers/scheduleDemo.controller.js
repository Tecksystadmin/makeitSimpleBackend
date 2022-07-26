const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { scheduleDemoService } = require("../services");

const createScheduleDemo = catchAsync(async (req, res) => {
  const scheduleDemo = await scheduleDemoService.createScheduleDemo(req.body);
  res.status(httpStatus.CREATED).send(scheduleDemo);
});

const getScheduleDemos = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name", "role"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await scheduleDemoService.queryScheduleDemos(filter, options);
  res.send(result);
});

const getScheduleDemo = catchAsync(async (req, res) => {
  const scheduleDemo = await scheduleDemoService.getScheduleDemoById(req.params.scheduleDemoId);
  if (!scheduleDemo) {
    throw new ApiError(httpStatus.NOT_FOUND, "scheduleDemo not found");
  }
  res.send(scheduleDemo);
});

const updateScheduleDemo = catchAsync(async (req, res) => {
  const scheduleDemo = await scheduleDemoService.updateScheduleDemoById(
    req.params.scheduleDemoId,
    req.body
  );
  res.send(scheduleDemo);
});

const deleteScheduleDemo = catchAsync(async (req, res) => {
  await scheduleDemoService.deleteScheduleDemoById(req.params.scheduleDemoId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createScheduleDemo,
  getScheduleDemos,
  getScheduleDemo,
  updateScheduleDemo,
  deleteScheduleDemo,
};
