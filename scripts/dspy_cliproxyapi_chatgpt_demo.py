import os

from dotenv import load_dotenv
import dspy


class AnswerQuestion(dspy.Signature):
    """Tra loi ngan gon, ro rang, bang tieng Viet."""

    question = dspy.InputField()
    answer = dspy.OutputField()


def build_lm() -> dspy.LM:
    load_dotenv()

    model = os.getenv("DSPY_MODEL", "openai/gpt-5")
    api_base = os.getenv("LOCAL_PROXY_BASE", "http://127.0.0.1:8317/v1")
    api_key = os.getenv("LOCAL_PROXY_API_KEY", "sk-local-dspy")

    return dspy.LM(
        model,
        api_base=api_base,
        api_key=api_key,
        model_type="chat",
        temperature=0.2,
    )


def main() -> None:
    dspy.configure(lm=build_lm())

    question = os.getenv(
        "DSPY_DEMO_QUESTION",
        "Lap ke hoach hoc DSPy trong 7 ngay cho nguoi moi bat dau.",
    )

    qa = dspy.ChainOfThought(AnswerQuestion)
    result = qa(question=question)

    print("Question:")
    print(question)
    print()
    print("Answer:")
    print(result.answer)


if __name__ == "__main__":
    main()
