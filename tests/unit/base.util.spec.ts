import { getContentType } from '../../src/utils/base.util';

describe('BaseUtil', () => {
  describe('getContentType', () => {
    it('should return image/jpeg for .jpg extension', () => {
      const result = getContentType('test.jpg');
      expect(result).toBe('image/jpeg');
    });

    it('should return image/jpeg for .jpeg extension', () => {
      const result = getContentType('test.jpeg');
      expect(result).toBe('image/jpeg');
    });

    it('should return image/png for .png extension', () => {
      const result = getContentType('test.png');
      expect(result).toBe('image/png');
    });

    it('should return image/gif for .gif extension', () => {
      const result = getContentType('test.gif');
      expect(result).toBe('image/gif');
    });

    it('should return image/webp for .webp extension', () => {
      const result = getContentType('test.webp');
      expect(result).toBe('image/webp');
    });

    it('should return video/mp4 for .mp4 extension', () => {
      const result = getContentType('test.mp4');
      expect(result).toBe('video/mp4');
    });

    it('should return video/quicktime for .mov extension', () => {
      const result = getContentType('test.mov');
      expect(result).toBe('video/mp4');
    });

    it('should return application/octet-stream for unknown extension', () => {
      const result = getContentType('test.unknown');
      expect(result).toBe('application/octet-stream');
    });
  });
});
