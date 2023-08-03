const optionRepository = require('../repositories/options.repository');


class OptionsService {

    OptionRepository = new optionRepository();

    cacheAllOptionsFromDB = async () => {
      try {
        await OptionRepository.cacheAllOptionsFromDB();
      } catch (error) {
        throw error;
      }
    };

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


  //옵션 생성 api
  createOption = async (extraPrice, shotPrice, hot) => {
    const createOptionData = await this.OptionRepository.createOption(extraPrice, shotPrice, hot);
    return {
      optionId: createOptionData.optionId,
      extraPrice: createOptionData.extraPrice,
      shotPrice: createOptionData.shotPrice,
      hot: createOptionData.hot,
    };
  }

  //옵션 수정 api
  updateOption = async (optionId, extraPrice,shotPrice,hot) => {
    const findOption = await this.OptionRepository.findOptionById(optionId);
    if (!findOption) throw new Error("옵션을 찾지 못하였습니다.");
    
    await this.OptionRepository.updateOption(optionId, extraPrice,shotPrice,hot);
    
    const updateOption = await this.OptionRepository.findOptionById(optionId);
    
    return {
      optionId: updateOption.optionId,
      extraPrice: updateOption.extraPrice,
      shotPrice: updateOption.shotPrice,
      hot: updateOption.hot,
    };
  };

  //옵션 삭제 api
  deleteOption = async (optionId) => {
    const findOption = await this.OptionRepository.findOptionById(optionId);
    if (!findOption) throw new Error("옵션을 찾을 수 없습니다.");
    
    await this.OptionRepository.deleteOption(optionId);
    
    return {
      optionId: findOption.optionId,
      extraPrice: findOption.extraPrice,
      shotPrice: findOption.shotPrice,
      hot: findOption.hot,
    };
  };
}



module.exports = OptionsService;