pragma solidity >=0.4.21 <0.6.0;

contract Users {
  string name;
  uint age;
  
  function setUser(string memory _name, uint _age) public {
   name = _name;
   age = _age;
  }

  function getUser() public view returns (string memory, uint)  {
    return (name, age);
  }
}