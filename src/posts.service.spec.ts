import { PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    const posts = [
      {text: 'Post 1'},
      {text: 'Post 2'},
      {text: 'Post 3'},
      {text: 'Post 4'},
    ];

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });

    it('should return all posts if called without options', () => {
      // реализуйте тест-кейс
      const res = postsService.findMany();
      expect(res.length).toBe(posts.length);
      expect(res).toEqual(expect.arrayContaining([
        expect.objectContaining({ text: 'Post 1'}),
        expect.objectContaining({ text: 'Post 2'}),
        expect.objectContaining({ text: 'Post 3'}),
        expect.objectContaining({ text: 'Post 4'}),
      ]))
    });

    it('should return correct posts for skip and limit options', () => {
      // реализуйте тест-кейс
      const skip = 2;
      const res = postsService.findMany({ skip });
      expect(res.length).toBe(posts.length - skip);
      expect(res[0].text).toBe('Post 3');
      expect(res[1].text).toBe('Post 4');
    });

    // реализуйте недостающие тест-кейсы
    it('should return correct posts for limit options', () => {
      const limit = 2;
      const res = postsService.findMany({ limit });
      expect(res.length).toBe(limit);
      expect(res[0].text).toBe('Post 1');
      expect(res[1].text).toBe('Post 2');
    });

    it('should return correct post for both skip and limit options', () => {
      const skip = 1;
      const limit = 2;
      const res = postsService.findMany({ skip, limit });
      expect(res.length).toBe(limit);
      expect(res[0].text).toBe('Post 2');
      expect(res[1].text).toBe('Post 3');
    });

    it('should return an emepty array if skip exceeds the number of posts', () => {
      const skip = posts.length + 1;
      const res = postsService.findMany({ skip });
      expect(res).toEqual([]);
    });
  });
});