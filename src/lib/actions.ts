import { client } from "@/sanity/client";



export const getPriests = async (page = 1, query?:string, title?:string, position?:string, sort?:string) => {
  const pageSize = 10;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const newSort = sort == "desc"? "desc" : "asc";

  //Dynamically Build Filters
  const filters = [`_type == "priest"`];

  if (query) {
    filters.push(
      `(fullname match "*${query}*" || bio match "*${query}*")` // Adjust field names as needed
    );
  }

  if (title) {
    filters.push(`(title match "*${title}*")`);
  }

  if (position) {
    filters.push(`(position match "*${position}*")`);
  }

  // 🌟 Build GROQ Query
  const newQuery = `*[${filters.join(" && ")}] | order(fullname ${newSort})[${start}...${end}]{
    _id,
    fullname, title, position, thumbnail, phoneNumber,
    parish->{ title, "slug":slug.current, image, dedicatedOn, deanary}
  }`;

    const response = await client.fetch(newQuery);  // 🌟 Debugging: Log results

     // 🌟 Fetch Total Count of Priests Matching Filters
  const totalCountQuery = `count(*[${filters.join(" && ")}])`;
  const totalCount = await client.fetch(totalCountQuery);

  // 🌟 Calculate nextId and previousId
  const hasNextPage = end < totalCount;
  const hasPreviousPage = page > 1;

    return {data:response, previousId: hasPreviousPage ? page - 1 : 0,
      nextId: hasNextPage ? page + 1 : 0,}
};



export const getParishes = async (query?:string, deanary?:string, type?:string, sort?:string) => {

  const newSort = sort == "desc"? "desc" : "asc";

  //Dynamically Build Filters
  const filters = [`_type == "parish"`];

  if (query) {
    filters.push(
      `(title match "*${query}*" || description match "*${query}*")` // Adjust field names as needed
    );
  }

  if (deanary) {
    filters.push(`(deanary match "*${deanary}*")`);
  }

  if (type) {
    filters.push(`(type match "*${type}*")`);
  }

  // 🌟 Build GROQ Query
  const newQuery = `*[${filters.join(" && ")}] {
    _id, title, isHeadOfDeanary, image, deanary, type, "slug":slug.current,
    parishPriest->{ fullname, _id, image, dedicatedOn, deanary}, administrator->{ fullname, _id, image, dedicatedOn, deanary},
    chaplain->{ fullname, _id, image, dedicatedOn, deanary}
  } | order(lower(title) ${newSort})`;

    const response = await client.fetch(newQuery);  // 🌟 Debugging: Log results

    return response;

 
};


export const getParishDetail = async(slug:string)=>{
  const newQuery = `*[_type == "parish" && slug.current == "${slug}"][0] {
    _id, title, isHeadOfDeanary, image, deanary, type, "slug":slug.current, images, description,
    parishPriest->{title, fullname, _id, image, dedicatedOn}, administrator->{title, fullname, _id, image, dedicatedOn},
    chaplain->{title, fullname, _id, image, dedicatedOn}, asstParishPriest->{title, fullname, _id, image, dedicatedOn},
    residentPriest->{title, fullname, _id, image, dedicatedOn},
     retiredPriest->{title, fullname, _id, image, dedicatedOn}
  }`;
  const response = await client.fetch(newQuery);  // 🌟 Debugging: Log results

    return response;
}

export const getPriestDetail = async(uid:string)=>{
  const newQuery = `*[_type == "priest" && _id == "${uid}"][0] {
    _id, fullname, title, position, bio, phoneNumber, thumbnail, email,
    parish->{title, "slug":slug.current, image, dedicatedOn, deanary}, 
    parish2->{title, "slug":slug.current, image, dedicatedOn, deanary}, 
  }`;
  const response = await client.fetch(newQuery);  // ��� Debugging: Log results
  return response;
}
