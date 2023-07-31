const { Options } = require('../models');
const NodeCache = require("node-cache");
const optionCache = new NodeCache();

const cacheOption = (option) => {
  optionCache.set(option.id.toString(), option.toJSON());
};


class optionRepository {

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

 //옵션 수정
  updateOption = async (optionId, extraPrice,shotPrice,hot) => {
    const updateOptionData = await Options.update(
      { extraPrice,shotPrice,hot },
      { where: { optionId } }
    );

    return updateOptionData;
  };
  
  //옵션 삭제
  // deleteOption = async (optionId) => {
  //   const deleteOptionData = await Options.destroy({ where: { optionId } });

  //   return deleteOptionData;
  // };

  deleteOption = async (optionId) => {
    try {
      // 먼저 DB에서 옵션을 삭제
      const deletedOption = await Options.destroy({ where: { id: optionId } });

      // 만약 삭제된 경우, 캐시에서도 삭제
      if (deletedOption) {
        optionCache.del(optionId.toString());
      }

      return deletedOption;
    } catch (error) {
      throw error;
    }
  };
}


module.exports = optionRepository;
