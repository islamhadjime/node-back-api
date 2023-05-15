
const ApiError = require('../exeption/api-error')
const Post = require('../models/Post')
const User = require('../models/User')




class PostContrroller {

    async list(req,res,next) {
        try {
            /*
                const pageNumber = req.query.page || 1;
                const startIndex = (pageNumber - 1) * pageSize;
                const endIndex = startIndex + pageSize;
                const posts = await Post.find().sort(
                    {votes:1, _id:1}).limit(endIndex)
            */
            let { page, size, sort } = req.query;
            if (!page) {
                page = 1;
            }
            if (!size) {
                size = 20;
            }

            const limit = parseInt(size);
            const posts = await Post.find().sort(
                {votes:1, _id:1}).limit(limit)

            res.json({posts})
        } catch (e) {
            next(e)
        }

    }
    async detail(req,res,next) {
        try {
            const name = req.params.name
            const post = await Post.findOne({name})
            if(!post){
                return next(ApiError.BadRequest('Пост не найден'))
            }
            res.status(200).json({post})
        } catch (e) {
            next(e)
        }
    }
    async create(req,res,next) {
        try {
            const {name, content} = req.body
            const postS =  await Post.findOne({name})
            if(postS){
                return next(ApiError.BadRequest('Такой пост уже создан'))
            }
            const post = new Post({name, content, owner: req.user.id})
            await post.save()
            res.status(200).json({message:"Пост создан",post});
        } catch (e) {
            next(e)
        }
    }
    async update(req,res,next) {
        try {
            const name = req.params.name
            const post = await Post.findOne({name})
            if(!post){
                return next(ApiError.BadRequest('Пост не найден'))
            }
            await post.updateOne(req.body)
            res.status(200).json({message:"Пост был обновлен",post});
        } catch (e) {
            next(e)
        }
    }
    async delete(req,res,next) {
        try {
            const name = req.params.name
            const post = await Post.findOne({name})
            if(!post){
                return next(ApiError.BadRequest('Пост не найден'))
            }
            await post.deleteOne();
            res.status(200).json("пост удален");
        } catch (e) {
            next(e)
        }
    }

}

module.exports = new PostContrroller();