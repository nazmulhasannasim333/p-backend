export const getUniqueBatches = (users) => {
    const uniqueBatches = new Set(users?.map(user => user.batch));
    return Array.from(uniqueBatches);
  };

 export const getUniqueAims = (users) => {
    const uniqueAims = new Set(users?.map(user => user.aim));
    return Array.from(uniqueAims);
  };

  export const getUniqueGroups = (users) => {
    const uniqueGroups = new Set(users?.map(user => user.group));
    return Array.from(uniqueGroups);
  };