-- Stored procedures, triggers, and functions for UPLBTRADE database 
USE uplbtrade;

delimter //

CREATE TRIGGER before_tagmap_insert
    BEFORE INSERT ON Tag
    for each row
BEGIN
    INSERT into Tagmap(item_id, tag_id) VALUES(row) 
END
//