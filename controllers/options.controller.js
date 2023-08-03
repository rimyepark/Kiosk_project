const OptionsService = require('../services/options.service');

class OptionsController {
    optionsService = new OptionsService();

    cacheAllOptionsFromDB = async () => {
      try {
        await optionsService.cacheAllOptionsFromDB();
      } catch (error) {
        // Handle error
        console.error('Failed to cache options from DB:', error);
      }
    };

    // 옵션 조회 api
  getOptions = async (req, res, next) => {
    const Options = await this.optionsService.findAllOption();

    res.status(200).json({ data: Options })
  }

// 옵션 생성 api
createOption = async (req, res, next) => {
  const { extraPrice, shotPrice, hot } = req.body;
  try {
    const createOptionData = await this.optionsService.createOption(extraPrice, shotPrice, hot);
    res.status(201).json({ data: JSON.parse(createOptionData) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

  //옵션 수정 api
  updateOption = async (req, res, next) => {
    const { optionId } = req.params;
    const { extraPrice,shotPrice,hot } = req.body;

    const updateOption = await this.optionsService.updateOption(
      optionId,
      extraPrice,
      shotPrice,
      hot
    );

    res.status(200).json({ data: updateOption });
  };

//옵션 삭제 api
  deleteOption = async (req, res, next) => {
    const { optionId } = req.params;
    const deleteOption = await this.optionsService.deleteOption(optionId);

    res.status(200).json({ data: deleteOption });
  };
}



module.exports = OptionsController;