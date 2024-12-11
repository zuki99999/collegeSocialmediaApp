import React from 'react'
import { Avatar , AvatarFallback, AvatarImage } from './ui/avatar'

function comment({comment}) {
  return (
    <>

    <div className="my-2 flex items-center">
        <Avatar className="flex gap-1 items-center">
            <AvatarImage src={comment?.author.profilePicture}/>
            <AvatarFallback className="w-8 h-8 " ><span className='font-sm'>CN</span></AvatarFallback>
        </Avatar>
        <h1 className="font-bold flex">{comment?.author.username}</h1> <span className='font-normal pl-1'>{comment?.text}</span> 
    </div>

    </>
  )
}

export default comment;
