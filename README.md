# Privacy User Counter

This helps count the number of users accessing your service in an very privacy friendly way.

- The main server calls this secondary server for every request
    - It passes a hashed version of the IP address in this request
- This user counter hashes and salts the (already hashed) IP and saves it in memory
- Every 48 hours, the size of the set is saved as the user count
    - The set is then cleared
    - A new salt is generated

This is good for privacy for several reasons:

- IPs are only stored hashed and salted with the salt rotating every 48 hours
- Hashed IPs are not associated with the contents of the request
- Data is only stored in memory