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

  deleteOption = async (optionId) => {
    const findOption = await this.OptionRepository.findOptionById(optionId);
    if (!findOption) throw new Error("옵션을 찾을 수 없습니다.");

    await this.OptionRepository.deleteOption(optionId);

    return {
      optionId: findOption.optionId,
      extraPrice: findOption.extraPrice,
      shotPrice: findOption.shotPrice,
      hot: findOption.hot,
      createdAt: findOption.createdAt,
      updatedAt: findOption.updatedAt,
    };
  };
}



module.exports = OptionsService;