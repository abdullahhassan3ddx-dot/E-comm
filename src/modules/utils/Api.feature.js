import { options } from "joi";



export class ApiFeatrue {
    constructor(mongooseQuery,searchQuery) {
        this.mongooseQuery=mongooseQuery
        this.searchQuery=searchQuery
    }
    pagaintion(){
        let pageNumber = this.searchQuery.page * 1 || 1
            if (this.searchQuery < 0) page = 1
            const limit = 2;
            this.pageNumber=pageNumber

            const skip = (pageNumber - 1) * limit
            this.mongooseQuery.skip(skip).limit(limit)
                return this

    }
    filter(){
        let filterObj = structuredClone(this.searchQuery)
           filterObj = JSON.stringify(filterObj)
           filterObj = filterObj.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`)
           filterObj = JSON.parse(filterObj)
           
           const excludedFields = ['page', 'sort', 'fields', 'search', 'limit']
           excludedFields.forEach((val) => delete filterObj[val]
           
    )
    
    this.mongooseQuery.find(filterObj)
    return this
}
sort(){
    if (this.searchQuery.sort) {
      let sortdBy = this.searchQuery.sort.split(',').join(' ')
      this.mongooseQuery.sort(sortdBy)
   }
   return this
}
fields(){
    if (this.searchQuery.fields) {
      let selectedFields = this.searchQuery.fields.split(',').join(' ')
      this.mongooseQuery.select(selectedFields)
   }
   return this
}
search(){
    if (this.searchQuery.search) {
        this.mongooseQuery.find({title:{$regex:this.searchQuery.search,options:'i'}})
   }
   return this
}
    

}