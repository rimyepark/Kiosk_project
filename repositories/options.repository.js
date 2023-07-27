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
 
  updateOption = async (optionId, extraPrice,shotPrice,hot) => {
    const updateOptionData = await Options.update(
      { extraPrice,shotPrice,hot },
      { where: { optionId } }
    );

    return updateOptionData;
  };
  
  deleteOption = async (optionId) => {
    const deleteOptionData = await Options.destroy({ where: { optionId } });

    return deleteOptionData;
  };
}


module.exports = optionRepository;
