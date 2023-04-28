const data =  await postModal.aggregate([
    {
        '$lookup': {
          'from': 'users', 
          'localField': 'postUser', 
          'foreignField': '_id', 
          'as': 'postUser'
        }
      }, {
        '$unwind': {
          'path': '$getlikes'
        }
      }, {
        '$lookup': {
          'from': 'likes', 
          'localField': 'getlikes', 
          'foreignField': '_id', 
          'as': 'likeDetails'
        }
      }, {
        '$unwind': {
          'path': '$likeDetails'
        }
      }, {
        '$lookup': {
          'from': 'users', 
          'localField': 'likeDetails.userclick_id', 
          'foreignField': '_id', 
          'as': 'likeUser'
        }
      }, {
        '$unwind': {
          'path': '$postcomment'
        }
      }, {
        '$lookup': {
          'from': 'comments', 
          'localField': 'postcomment', 
          'foreignField': '_id', 
          'as': 'comments'
        }
      }, {
        '$unwind': {
          'path': '$comments'
        }
      }, {
        '$lookup': {
          'from': 'users', 
          'localField': 'comments.usercomment_id', 
          'foreignField': '_id', 
          'as': 'clickUsers'
        }
      } 
])
console.log(data);