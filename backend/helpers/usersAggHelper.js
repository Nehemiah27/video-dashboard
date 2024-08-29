export const searchAgg = (searchText) => {
  return {
    $match: {
      $or: [
        {
          firstName: {
            $regex: new RegExp(searchText, "i"),
          },
        },
      ],
    },
  };
};

export const shaping = () => {
  return {
    $project: {
      _id: false,
      firstName: 1,
      userID: 1,
      userAvatar: 1,
    },
  };
};

export const videoGathering = () => {
  return {
    $lookup: {
      from: "videos",
      let: {
        user_id: "$userID",
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$userID", "$$user_id"],
            },
          },
        },
        {
          $sort: {
            updatedAt: -1,
          },
        },
        {
          $limit: 5,
        },
        {
          $project: { _id: false, __v: false, userID: false },
        },
      ],
      as: "videos",
    },
  };
};

export const grouping = () => {
  return {
    $group: {
      _id: null,
      count: {
        $sum: 1,
      },
      data: {
        $push: "$$ROOT",
      },
    },
  };
};

export const docSummary = (page, docsPerPage) => {
  return {
    $project: {
      data: {
        $slice: ["$data", docsPerPage * (page - 1), docsPerPage],
      },
      totalRecords: { $size: "$data" },
      _id: false,
    },
  };
};

export const videoListLookUp = () => {
  return {
    $lookup: {
      from: "videos",
      let: {
        user_id: "$userID",
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$userID", "$$user_id"],
            },
          },
        },
        {
          $sort: {
            updatedAt: -1,
          },
        },
        {
          $project: { _id: false, __v: false, userID: false },
        },
      ],
      as: "videos",
    },
  };
};
