Application launch.

Enter the required command by sample:
1. node index.js --id 1 or -i 1 --> searching by id
2. node index.js --name 'Rick' or -n 'Rick' --> searching by name
3. node index.js --status 'Alive' or -s 'Alive' --> searching by status
4. node index.js --spesies 'Human' or -r 'Human' --> searching by species
5. node index.js --type 'Drumbloxian' or "-t 'Drumbloxian' --> searching by type
6. node index.js --gender 'Male' or -g 'Male' --> searching by gender
7. node index.js --origin 'Earth' or "-o 'Earth' --> searching by origin
8. node index.js --location 'Citadel of Ricks' or -l 'Citadel of Ricks' --> searching by location

You can combine different commands for searching. For example:
node index.js --id 1 --name 'Rick' --spesies 'Human' --> searching by id, name, spesies

result.json is written to the result folder