// Matching algorithm
exports.matches = (needle, haystack) => {
  const needleTech = needle.tech.map(tech => tech.value);
  const needleIndustry = needle.industry.map(industry => industry.value);
  const matchingHaystack = haystack
    .map(hay => {
      const { tech, industry } = hay;

      const techMatch = tech.filter(hayTech => needleTech.includes(hayTech.value));
      const industryMatch = industry.filter(hayIndustry =>
        needleIndustry.includes(hayIndustry.value)
      );

      return { ...hay, techMatch, industryMatch };
    })
    .filter(hay => hay.techMatch.length > 0 && hay.industryMatch.length > 0);

  return matchingHaystack;
};
