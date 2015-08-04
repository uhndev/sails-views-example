-- View: customersale

-- DROP VIEW customersale;

CREATE OR REPLACE VIEW customersale AS 
 SELECT customer.id,
    customer.name AS "customerName",
    product.name AS "productName",
    product.price,
    sale.id AS "saleId",
    sale."saleNumber",
    customer."createdAt",
    customer."updatedAt"
   FROM sale
     LEFT JOIN product ON sale.product = product.id
     LEFT JOIN customer ON sale.customer = customer.id;

ALTER TABLE customersale
  OWNER TO postgres;