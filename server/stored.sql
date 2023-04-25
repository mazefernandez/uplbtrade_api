-- Stored procedures, triggers, and functions for UPLBTRADE database 
USE uplbtrade;

delimiter //

CREATE TRIGGER log_transaction AFTER INSERT ON Transaction
    FOR EACH ROW
    BEGIN
    	INSERT into Transaction_Tracking(date, transaction_id) VALUES(now(), NEW.transaction_id);
    END
//

CREATE TRIGGER log_received AFTER INSERT ON Customer_Review
    FOR EACH ROW
    BEGIN
         INSERT into Transaction_Tracking(status, date, transaction_id) VALUES('Order received', now(), NEW.transaction_id);
    END
//

CREATE TRIGGER insert_tag AFTER INSERT ON Tagmap
    FOR EACH ROW
    BEGIN
	INSERT into Tag(tag_name) VALUES(NEW.tag_name);
    END
//
