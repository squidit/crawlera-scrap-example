class HTMLUtil {
  getMedia(html) {
    let jsonString = null
    const split1 = html.split(`"PostPage":[`)
    if (split1.length > 1) {
      const split2 = split1[1].split(`]},"hostname":`)
      if (split2.length > 1) {
        jsonString = split2[0]
      }
    }
  
    const jsonMedia = JSON.parse(jsonString)
    return this.parseMedia(jsonMedia)
  }
  parseMedia (sharedData) {
    const mediaNode = sharedData.graphql.shortcode_media
    return this.mapMedia(mediaNode) 
  }

  mapMedia (mediaNode, fatherNode) {
    const mediaObject = {
      ...mediaNode,
      type: mediaNode.__typename,
      users_in_photo: mediaNode.edge_media_to_tagged_user.edges && mediaNode.edge_media_to_tagged_user.edges.length > 0 ? mediaNode.edge_media_to_tagged_user.edges.map((t) => { return t.node }) : [],
      caption: mediaNode.edge_media_to_caption && mediaNode.edge_media_to_caption.edges && mediaNode.edge_media_to_caption.edges.length > 0 ? mediaNode.edge_media_to_caption.edges[0].node.text : null,
      comments: mediaNode.edge_media_preview_comment ? {
        count: mediaNode.edge_media_preview_comment.count
      } : null,
      likes: mediaNode.edge_media_preview_like ? {
        count: mediaNode.edge_media_preview_like.count
      } : null,
      id: `${mediaNode.id}_${mediaNode.owner ? mediaNode.owner.id : fatherNode.owner.id}`,
      created_time: mediaNode.taken_at_timestamp,
      link: `http://instagr.am/p/${mediaNode.shortcode}/`,
      user: mediaNode.owner ? {
        username: mediaNode.owner.username,
        profile_picture: mediaNode.owner.profile_pic_url,
        id: mediaNode.owner.id
      } : null,
      images: mediaNode,
      location: mediaNode.location,
      product_type: mediaNode.product_type,
      title: mediaNode.title
    }
  
    return mediaObject
  }
}

export default HTMLUtil