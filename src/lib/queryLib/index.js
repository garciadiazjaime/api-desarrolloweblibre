export default class QueryLib {

  static contentToPost() {
    return `select
        id,
        post_title,
        post_date,
        post_name,
        SUBSTRING(post_content, 1, 140) as content
      from wp_posts wp
      where id not in (select post_id from marketing)
      order by post_date
      limit 1;`;
  }

  static updatePost(postId) {
    return {
      sql: 'insert into marketing set ?',
      values: {
        network: 'FACEBOOK',
        post_id: postId,
      },
    };
  }
}
