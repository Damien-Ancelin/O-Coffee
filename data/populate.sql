BEGIN;

-- INSERT INTO origin --
INSERT INTO "origin" ("name") VALUES 
('Italie'),
('Colombie'),
('Éthiopie'),
('Brésil'),
('Guatemala'),
('Kenya'),
('Indonésie'),
('Costa Rica'),
('Vietnam'),
('Tanzanie'),
('Jamaïque'),
('Rwanda'),
('Panama'),
('Pérou'),
('Hawaï'),
('Nicaragua');

-- INSERT INTO flavor --
INSERT INTO "flavor" ("name") VALUES 
('Corsé'),
('Acide'),
('Fruité'),
('Doux'),
('Chocolaté'),
('Épicé');

-- INSERT INTO coffee --
INSERT INTO "coffee" ("name", "reference", "description", "price", "available", "origin_id", "flavor_id") VALUES
('Espresso', 
 100955890, 
 'Café fort et concentré préparé en faisant passer de l''eau chaude à travers du café finement moulu.',
 20.99, TRUE, 1, 1),  -- Italie, Corsé

('Columbian', 
 100955894, 
 'Café moyennement corsé avec une acidité vive et une saveur riche.',
 18.75, TRUE, 2, 2),  -- Colombie, Acide

('Ethiopian Yirgacheffe', 
 105589090, 
 'Réputé pour son arôme floral, son acidité vive et ses notes de saveur citronnée.',
 22.50, TRUE, 3, 3),  -- Éthiopie, Fruité

('Brazilian Santos', 
 134009550, 
 'Café doux et lisse avec un profil de saveur de noisette.',
 17.80, TRUE, 4, 4),  -- Brésil, Doux

('Guatemalan Antigua', 
 256505890, 
 'Café corsé avec des nuances chocolatées et une pointe d''épice.',
 21.25, TRUE, 5, 1),  -- Guatemala, Corsé

('Kenyan AA', 
 295432730, 
 'Café complexe connu pour son acidité rappelant le vin et ses saveurs fruitées.',
 23.70, TRUE, 6, 2),  -- Kenya, Acide

('Sumatra Mandheling', 
 302932754, 
 'Café profond et terreux avec un corps lourd et une faible acidité.',
 19.95, TRUE, 7, 1),  -- Indonésie, Corsé

('Costa Rican Tarrazu', 
 327302954, 
 'Café vif et net avec une finition propre et une acidité vive.',
 24.50, TRUE, 8, 2),  -- Costa Rica, Acide

('Vietnamese Robusta', 
 549549090, 
 'Café audacieux et fort avec une saveur robuste distinctive.',
 16.75, TRUE, 9, 5),  -- Vietnam, Épicé

('Tanzanian Peaberry', 
 582954954, 
 'Acidité vive avec un profil de saveur rappelant le vin et un corps moyen.',
 26.80, TRUE, 10, 3),  -- Tanzanie, Fruité

('Jamaican Blue Mountain', 
 589100954, 
 'Reconnu pour sa saveur douce, son acidité vive et son absence d''amertume.',
 39.25, TRUE, 11, 4),  -- Jamaïque, Doux

('Rwandan Bourbon', 
 650753915, 
 'Café avec des notes florales prononcées, une acidité vive et un corps moyen.',
 21.90, TRUE, 12, 3),  -- Rwanda, Fruité

('Panamanian Geisha', 
 795501340, 
 'Café rare aux arômes floraux complexes, une acidité brillante et un profil de saveur distinctif.',
 42.00, TRUE, 13, 3),  -- Panama, Fruité

('Peruvian Arabica', 
 954589100, 
 'Café équilibré avec des notes de chocolat, une acidité modérée et un corps velouté.',
 19.40, FALSE, 14, 6),  -- Pérou, Chocolaté

('Hawaiian Kona', 
 958090105, 
 'Café rare au goût riche, une acidité douce et des nuances subtiles.',
 55.75, FALSE, 15, 4),  -- Hawaï, Doux

('Nicaraguan Maragogipe', 
 691550753, 
 'Café avec des notes de fruits, une acidité vive et un corps plein.',
 28.60, FALSE, 16, 3);  -- Nicaragua, Fruité

-- INSERT INTO flavor --
INSERT INTO "role" ("name") VALUES 
('admin'),
('customer');

-- CREATE TABLE user --
INSERT INTO "user" ("email", "lastname", "firstname", "password", "role_id") VALUES
  ('ancelin.damien@gmail.com', 'Ancelin', 'Damien', 'test', 1);

 COMMIT;