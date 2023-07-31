const { Options } = require('../models');
const NodeCache = require("node-cache");
const optionCache = new NodeCache();

const cacheOption = (option) => {
  optionCache.set(option.id.toString(), option.toJSON());
};


class optionRepository {


   // 서버 최초 기동시 option 테이블의 모든 정보를 메모리에 캐싱
   cacheAllOptionsFromDB = async () => {
    try {
      const optionsFromDB = await Options.findAll();

      // 가져온 option 데이터를 메모리에 캐싱
      optionsFromDB.forEach((option) => {
        cacheOption(option);
      });
    } catch (error) {
      throw error;
    }
  };

  //옵션 조회
  findAllOption = async () => {
    const options = await Options.findAll();
    return options;
  }

  //해당 옵션 찾기
  findOptionById = async (optionId) => {
    const options = await Options.findByPk(optionId);
    return options;
  };

  //옵션 생성
  // createOption = async (extraPrice,shotPrice,hot) => {
  //   const createOption = await Options.create({ extraPrice,shotPrice,hot });
  //   return createOption;
  // }

 // 옵션 생성
  createOption = async (extraPrice, shotPrice, hot) => {
    try {
      const option = await Options.create({ extraPrice, shotPrice, hot });
      cacheOption(option);
      return option.toJSON();
    } catch (error) {
      throw error;
    }
  };

 //옵션 수정
  // updateOption = async (optionId, extraPrice,shotPrice,hot) => {
  //   const updateOptionData = await Options.update(
  //     { extraPrice,shotPrice,hot },
  //     { where: { optionId } }
  //   );

  //   return updateOptionData;
  // };

  updateOption = async (optionId, extraPrice, shotPrice, hot) => {
    const updateOptionData = await Options.update(
      { extraPrice, shotPrice, hot },
      { where: { id: optionId } }
    );

    if (updateOptionData[0] > 0) {
      // 업데이트된 데이터를 찾아 캐시에 업데이트
      const updatedOption = await Options.findByPk(optionId);
      cacheOption(updatedOption.toJSON());
    }

    return updateOptionData;
  };
  
  //옵션 삭제
  // deleteOption = async (optionId) => {
  //   const deleteOptionData = await Options.destroy({ where: { optionId } });

  //   return deleteOptionData;
  // };

  deleteOption = async (optionId) => {
    try {
      const deletedOptionData = await Options.destroy({ where: { id: optionId } });

      // 만약 삭제된 경우, 캐시에서도 삭제
      if (deletedOptionData > 0) {
        optionCache.del(optionId.toString());
      }

      return deletedOptionData;
    } catch (error) {
      throw error;
    }
  };
}


module.exports = optionRepository;
