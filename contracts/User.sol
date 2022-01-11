// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.3;

// Creating a Smart Contract
contract StructDemo{

    // Structure of User
    struct User{
        
        // State variables
        int userId;
        string username;
        string department;
        string designation;
    }

    User []emps;

    // Function to add
    // User details
    function addUser(
        int userId, 
        string memory username,
        string memory department,
        string memory designation
    ) public{
        User memory e
            =User(userId,
                    username,
                    department,
                    designation);
        emps.push(e);
    }

    // Function to get
    // details of User
    function getUser(
        int userId
    ) public view returns(
        string memory,
        string memory,
        string memory){
        uint i;
        for(i=0;i<emps.length;i++)
        {
            User memory e
                =emps[i];
            
            // Looks for a matching
            // User id
            if(e.userId==userId)
            {
                    return(e.username,
                        e.department,
                        e.designation);
            }
        }
        
        // If provided User
        // id is not present
        // it returns Not
        // Found
        return("Not Found",
                "Not Found",
                "Not Found");
    }
}
