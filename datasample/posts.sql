INSERT INTO "posts" 
("title", "media_url", "media_width", "media_height", "is_private", "user_id", "created_at")
VALUES
-- Page 1 (newest)
('Post 1', 'https://example.com/1.jpg', 800, 600, true, 1, '2024-03-20 10:00:00'),
('Post 2', 'https://example.com/2.jpg', 800, 600, false, 2, '2024-03-20 09:45:00'),
('Post 3', 'https://example.com/3.jpg', 800, 600, true, 1, '2024-03-20 09:30:00'),
('Post 4', 'https://example.com/4.jpg', 800, 600, false, 2, '2024-03-20 09:15:00'),
('Post 5', 'https://example.com/5.jpg', 800, 600, true, 1, '2024-03-20 09:00:00'),
('Post 6', 'https://example.com/6.jpg', 800, 600, false, 2, '2024-03-20 08:45:00'),
('Post 7', 'https://example.com/7.jpg', 800, 600, true, 1, '2024-03-20 08:30:00'),
('Post 8', 'https://example.com/8.jpg', 800, 600, false, 2, '2024-03-20 08:15:00'),
('Post 9', 'https://example.com/9.jpg', 800, 600, true, 1, '2024-03-20 08:00:00'),
('Post 10', 'https://example.com/10.jpg', 800, 600, true, 2, '2024-03-20 07:45:00'),

-- Page 2
('Post 11', 'https://example.com/11.jpg', 800, 600, false, 1, '2024-03-19 10:00:00'),
('Post 12', 'https://example.com/12.jpg', 800, 600, true, 2, '2024-03-19 09:45:00'),
('Post 13', 'https://example.com/13.jpg', 800, 600, false, 1, '2024-03-19 09:30:00'),
('Post 14', 'https://example.com/14.jpg', 800, 600, true, 2, '2024-03-19 09:15:00'),
('Post 15', 'https://example.com/15.jpg', 800, 600, false, 1, '2024-03-19 09:00:00'),
('Post 16', 'https://example.com/16.jpg', 800, 600, true, 2, '2024-03-19 08:45:00'),
('Post 17', 'https://example.com/17.jpg', 800, 600, false, 1, '2024-03-19 08:30:00'),
('Post 18', 'https://example.com/18.jpg', 800, 600, true, 2, '2024-03-19 08:15:00'),
('Post 19', 'https://example.com/19.jpg', 800, 600, false, 1, '2024-03-19 08:00:00'),
('Post 20', 'https://example.com/20.jpg', 800, 600, true, 2, '2024-03-19 07:45:00'),

-- Page 3 (oldest)
('Post 21', 'https://example.com/21.jpg', 800, 600, false, 1, '2024-03-18 10:00:00'),
('Post 22', 'https://example.com/22.jpg', 800, 600, true, 2, '2024-03-18 09:45:00'),
('Post 23', 'https://example.com/23.jpg', 800, 600, false, 1, '2024-03-18 09:30:00'),
('Post 24', 'https://example.com/24.jpg', 800, 600, true, 2, '2024-03-18 09:15:00'),
('Post 25', 'https://example.com/25.jpg', 800, 600, false, 1, '2024-03-18 09:00:00'),
('Post 26', 'https://example.com/26.jpg', 800, 600, true, 2, '2024-03-18 08:45:00'),
('Post 27', 'https://example.com/27.jpg', 800, 600, false, 1, '2024-03-18 08:30:00'),
('Post 28', 'https://example.com/28.jpg', 800, 600, true, 2, '2024-03-18 08:15:00'),
('Post 29', 'https://example.com/29.jpg', 800, 600, false, 1, '2024-03-18 08:00:00'),
('Post 30', 'https://example.com/30.jpg', 800, 600, true, 2, '2024-03-18 07:45:00');