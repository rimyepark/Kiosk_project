const { Options } = require('../models');

class optionRepository {
  findAllOption = async () => {

    const options = await Options.findAll();

    return options;
  }

  createOption = async (extraPrice,shotPrice,hot) => {

    const createOption = await Options.create({ extraPrice,shotPrice,hot });

    return createOption;
  }
}


module.exports = optionRepository;
