const optionRepository = require('../repositories/options.repository');

class OptionsService {
    OptionRepository = new optionRepository();

    findAllOption = async() => {
  
    const allOption = await this.OptionRepository.findAllOption();


    return allOption.map(option => {
      return {
        optionId: option.optionId,
        extraPrice: option.extraPrice,
        shotPrice: option.shotPrice,
        hot: option.hot,
        createdAt: option.createdAt,
        updatedAt: option.updatedAt,
      }
    });
  }

  createOption = async (extraPrice,shotPrice,hot) => {
  
    const CreateOptionData = await this.OptionRepository.createOption(extraPrice,shotPrice,hot);

    return {
      optionId: CreateOptionData.optionId,
      extraPrice: CreateOptionData.extraPrice,
      shotPrice: CreateOptionData.shotPrice,
      hot: CreateOptionData.hot,
    };
  }
}

module.exports = OptionsService;