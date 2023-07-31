const { Options } = require('../models');
const optionRepository = require('../repositories/options.repository');
const NodeCache = require("node-cache");
const optionCache = new NodeCache();

const cacheOption = (option) => {
  optionCache.set(option.id.toString(), option.toJSON());
};

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

  createOption = async (extraPrice, shotPrice, hot) => {
    try {
      // Option 모델에 해당하는 Sequelize 코드를 사용하여 데이터베이스에 옵션 생성
      const option = await Option.create({ extraPrice, shotPrice, hot });

      // 생성된 옵션 데이터를 캐시에 저장
      cacheOption(option);

      return option.toJSON();
    } catch (error) {
      throw error;
    }
  };

  //옵션 생성 api
  // createOption = async (extraPrice,shotPrice,hot) => {  
  //  const CreateOptionData = await this.OptionRepository.createOption(extraPrice,shotPrice,hot);
  //   return {
  //     optionId: CreateOptionData.optionId,
  //     extraPrice: CreateOptionData.extraPrice,
  //     shotPrice: CreateOptionData.shotPrice,
  //     hot: CreateOptionData.hot,
  //   };
  // }

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