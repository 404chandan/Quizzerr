const Question = require("../models/Question");

// ✅
exports.createQuestion = async (req, res) => {
  try {
    const { questionText, options, quizId } = req.body;

    if (!questionText || !options) {
      return res.status(400).json({
        success: false,
        error: "Please provide all the required fields",
      });
    }

    if (!Array.isArray(options) || options.length < 2) {
      return res.status(400).json({
        success: false,
        error: "Options should be an array with at least two items.",
      });
    }

    for (const option of options) {
      if (
        typeof option.text !== "string" ||
        typeof option.isCorrect !== "boolean"
      ) {
        return res.status(400).json({
          success: false,
          error:
            "Each option should have 'text' as string and 'isCorrect' as boolean.",
        });
      }
    }

    const requstion = await Question.create({
      quizId,
      questionText,
      options,
    });

    return res.status(201).json({
      success: true,
      message: "Question created successfully",
      data: requstion,
    });
  } catch (e) {
    console.log("ERROR CREATING QUESTION: ", e);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

// ✅
exports.updateQuestion = async (req, res) => {
  try {
    const { questionText, options } = req.body;
    const { id } = req.params;

    // Check for required fields
    if (!questionText || !options) {
      return res.status(400).json({
        success: false,
        error: "Please provide question text and options.",
      });
    }

    // Validate options structure
    if (!Array.isArray(options) || options.length < 2) {
      return res.status(400).json({
        success: false,
        error: "Options should be an array with at least two items.",
      });
    }

    for (const option of options) {
      if (
        typeof option.text !== "string" ||
        typeof option.isCorrect !== "boolean"
      ) {
        return res.status(400).json({
          success: false,
          error:
            "Each option should have 'text' as string and 'isCorrect' as boolean.",
        });
      }
    }

    // Update the question
    const question = await Question.findByIdAndUpdate(
      id,
      { questionText, options },
      { new: true }
    );

    if (!question) {
      return res.status(404).json({
        success: false,
        error: "Question not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Question updated successfully",
      question,
    });
  } catch (e) {
    console.error("ERROR UPDATING QUESTION:", e.message);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

// ✅
exports.deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the question
    const question = await Question.findByIdAndDelete(id);

    if (!question) {
      return res.status(404).json({
        success: false,
        error: "Question not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Question deleted successfully",
    });
  } catch (e) {
    console.error("ERROR DELETING QUESTION:", e.message);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

// ✅
exports.getQuizQuestions = async (req, res) => {
  try {
    const quizId = req.params.id;
    const questions = await Question.find({ quizId });
    return res.status(200).json({
      success: true,
      data: questions,
    });
  } catch (e) {
    console.log("ERROR GETTING QUIZ QUESTIONS: ", e);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
