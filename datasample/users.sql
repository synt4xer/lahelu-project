-- Passwords:
-- user1: password123 -> $2b$10$MjrTI/lm7Xdor6Ee1NGjQestvpoXL2PXncpR4ZoVv0pBc0YnQpmeC
-- user2: password456 -> $2b$10$fqArkz7tauUfaKOsRwWeGOKoqAdwpjc.FGEOnIyYxBaU2f4qPQXAm

INSERT INTO "users" 
("username", "password", "avatar", "created_at")
VALUES
('john_doe', '$2b$10$MjrTI/lm7Xdor6Ee1NGjQestvpoXL2PXncpR4ZoVv0pBc0YnQpmeC', 'https://vg-avatar-bucket.s3.ap-southeast-1.amazonaws.com/default-avatar.jpg', '2024-03-20 08:00:00'),
('jane_smith', '$2b$10$fqArkz7tauUfaKOsRwWeGOKoqAdwpjc.FGEOnIyYxBaU2f4qPQXAm', 'https://vg-avatar-bucket.s3.ap-southeast-1.amazonaws.com/default-avatar.jpg', '2024-03-20 08:30:00');