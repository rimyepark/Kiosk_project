const { Options } = require('../models');

class optionRepository {
  findAllOption = async () => {

    const options = await Options.findAll();

    return options;
  }

  findOptionById = async (optionId) => {
    const options = await Options.findByPk(optionId);

    return options;
  };

  createOption = async (extraPrice,shotPrice,hot) => {

    const createOption = await Options.create({ extraPrice,shotPrice,hot });

    return createOption;
  }

  
  deleteOption = async (optionId) => {
    const deleteOptionData = await Options.destroy({ where: { optionId } });

    return deleteOptionData;
  };
}


module.exports = optionRepository;
