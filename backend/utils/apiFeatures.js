module.exports = class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query; //Product.find()
        this.queryStr = queryStr; //req.query {keyword = "xyz"}
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword, // find anywhere from a word
                $options: "i",      // capital or small letter doesn't matter
            },
        } : {};

        this.query = this.query.find({ ...keyword })
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr };

        const removeFields = ["keyword", "page", "limit"]
        removeFields.forEach((key) => delete queryCopy[key]) // remove queries which include "removefields" items

        // filter for pricing and rating
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`)

        this.query = this.query.find(JSON.parse(queryStr));
        return this
    }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page)
        console.log(currentPage)
        const skip = (resultPerPage * currentPage) - resultPerPage;
        // const skip = resultPerPage * (currentPage - 1)

        this.query = this.query.limit(resultPerPage).skip(skip);


        return this;

    }
}

