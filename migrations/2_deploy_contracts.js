const Addition = artifacts.require('Addition');

module.exports = function(deployer) {
  deployer.deploy(Addition);
};
