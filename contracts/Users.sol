pragma solidity >=0.4.21 <0.6.0;

contract Addition {
  int public sum = 0;
  
  function add (int x, int y) public {
    sum = x + y;
  }
}