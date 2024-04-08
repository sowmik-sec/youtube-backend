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
];
