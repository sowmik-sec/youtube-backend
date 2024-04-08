[
  {
    $unwind: "$tags",
  },
  {
    $group: {
      _id: "$_id",
      numberOfTags: {
        $sum: 1,
      },
    },
  },
  {
    $group: {
      _id: null,
      averageNumberOfTags: {
        $avg: "$numberOfTags",
      },
    },
  },
];

[
  {
    $addFields: {
      numberOfTags: {
        $size: {
          $ifNull: ["$tags", []],
        },
      },
    },
  },
  {
    $group: {
      _id: null,
      averageNumberOfTags: {
        $avg: "$numberOfTags",
      },
    },
  },
];

[
  {
    $match: {
      tags: "id",
    },
  },
  {
    $count: "userWithEnimTag",
  },
];

[
  {
    $match: {
      isActive: false,
      tags: "velit",
      age: 20,
    },
  },
  {
    $project: {
      name: 1,
      age: 1,
    },
  },
];

[
  {
    $match: {
      "company.phone": /^\+1 \(940\)/,
    },
  },
  {
    $count: "usersWithSpecialPhoneNumber",
  },
];

[
  {
    $sort: {
      registered: -1,
    },
  },
  {
    $limit: 4,
  },
  {
    $project: {
      name: 1,
      registered: 1,
      favoriteFruit: 1,
    },
  },
];

[
  {
    $group: {
      _id: "$favoriteFruit",
      users: { $push: "$name" },
    },
  },
];

[
  {
    $match: {
      "tags.1": "ad",
    },
  },
  {
    $count: "secondTagAd",
  },
];

[
  {
    $match: {
      tags: {
        $all: ["enim", "id"],
      },
    },
  },
];

[
  {
    $match: {
      "company.location.country": "USA",
    },
  },
  {
    $group: {
      _id: "$company.title",
      userCount: { $sum: 1 },
    },
  },
];

[
  {
    $lookup: {
      from: "authors",
      localField: "author_id",
      foreignField: "_id",
      as: "author_details",
    },
  },
  {
    $addFields: {
      author_details: {
        $arrayElemAt: ["$author_details", 0],
      },
    },
  },
];
