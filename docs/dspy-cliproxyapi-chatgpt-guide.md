# Huong dan A-Z: DSPy + CLIProxyAPI + ChatGPT tren Windows

Tai lieu nay huong dan cach dung `DSPy` de lap trinh luong suy luan, `CLIProxyAPI` de bien tai khoan `ChatGPT/Codex` thanh mot endpoint OpenAI-compatible local, va Python de goi toan bo stack do tu may cua ban.

Muc tieu la sau khi doc xong, ban co the:

- dang nhap ChatGPT/Codex vao `CLIProxyAPI`
- mo duoc mot local proxy an toan tren may
- ket noi `DSPy` vao endpoint do
- viet module DSPy dau tien
- toi uu module bang optimizer cua DSPy
- biet cach debug cac loi pho bien

Tai lieu duoc viet cho Windows + PowerShell, va da doi chieu lai voi tai lieu cong khai tinh den ngay 2026-03-19.

## 1. Tong quan kien truc

Stack nay hoat dong nhu sau:

```text
DSPy app (Python)
  -> goi OpenAI-compatible endpoint
  -> CLIProxyAPI local server (http://127.0.0.1:8317/v1)
  -> su dung OAuth / thong tin dang nhap ChatGPT/Codex
  -> model tra ve ket qua cho DSPy
```

Noi ngan gon:

- `DSPy` giup ban viet AI workflow bang code thay vi prompt string roi rac.
- `CLIProxyAPI` dong vai tro cau noi de cac client kieu OpenAI co the goi qua mot local proxy.
- `ChatGPT/Codex` la tai khoan nguon phia sau.

## 2. Dieu can hieu truoc khi bat dau

Day la diem rat quan trong:

- Luong dung `CLIProxyAPI` la luong ben thu ba, khong phai quy trinh OpenAI API chinh thuc.
- OpenAI API chinh thuc van dung `API key` rieng va tai lieu rieng tren `platform.openai.com`.
- Neu muc tieu cua ban la xay dung tich hop chinh thuc cho ChatGPT, huong di chinh thuc hien nay la `Developer mode` + `MCP` hoac `Responses API`, tuy theo bai toan.

Noi cach khac, guide nay rat huu ich cho hoc tap, thu nghiem, local lab, va cac workflow ca nhan. Neu ban dang xay he thong production cho khach hang, hay danh gia ky rui ro van hanh, bao mat, va tinh on dinh cua ben thu ba.

## 3. Khi nao nen dung stack nay

Nen dung khi ban muon:

- thu nghiem DSPy nhanh ma khong muon doi thiet lap mot backend phuc tap
- bien mot tai khoan ChatGPT/Codex thanh endpoint local de cac tool Python goi vao
- xay bo khung prompt pipeline, extraction, classification, hoac RAG bang DSPy
- toi uu prompt/system behavior bang DSPy optimizer

Khong nen dung khi ban muon:

- mot duong tich hop chinh thuc 100% tu OpenAI
- compliance va production hardening muc cao
- de boi ro ro giua subscription ChatGPT va OpenAI API

## 4. Yeu cau dau vao

Ban can:

- Windows 10 hoac 11
- Python 3.11+ (`python --version`)
- PowerShell
- Tai khoan ChatGPT/Codex hop le cho luong dang nhap ma `CLIProxyAPI` ho tro
- Ket noi Internet de dang nhap OAuth va goi model

Khuyen nghi them:

- Visual Studio Code
- Git
- mot thu muc rieng de giu `CLIProxyAPI`, config, va credential

## 5. Cau truc thu muc de xai de hon

Ban co the tu chon duong dan, nhung cau truc nay rat de quan ly:

```text
C:\ai-lab\
  cli-proxy-api\
    cli-proxy-api.exe
    config.yaml
    auth\
  dspy-app\
    .venv\
    main.py
    .env
```

Neu ban chi muon hoc nhanh, co the dat tat ca trong cung mot folder. Tuy nhien tach rieng `proxy` va `dspy-app` se de debug hon.

## 6. Cai CLIProxyAPI

### Cach nhanh nhat

1. Tai ban phat hanh Windows moi nhat tu trang release cua du an:
   - <https://github.com/router-for-me/CLIProxyAPI/releases>
2. Giai nen vao vi du:
   - `C:\ai-lab\cli-proxy-api\`
3. Dam bao trong thu muc do co file thuc thi, vi du:
   - `cli-proxy-api.exe`

### Vi sao buoc nay can thiet

`CLIProxyAPI` la local server se nghe tren port `8317` mac dinh va phat ra endpoint kieu `http://127.0.0.1:8317/v1`.

## 7. Tao file config.yaml

Trong thu muc `C:\ai-lab\cli-proxy-api\`, tao file `config.yaml` voi noi dung toi thieu sau:

```yaml
host: "127.0.0.1"
port: 8317

auth-dir: "C:/ai-lab/cli-proxy-api/auth"

api-keys:
  - "sk-local-dspy"

debug: false
request-retry: 3

routing:
  strategy: "round-robin"

remote-management:
  allow-remote: false
  secret-key: ""
  disable-control-panel: true
```

### Giai thich nhanh tung dong

- `host: "127.0.0.1"`: chi mo local, an toan hon nhieu so voi bind ra ngoai mang.
- `port: 8317`: cong mac dinh cua `CLIProxyAPI`.
- `auth-dir`: noi luu credential/OAuth.
- `api-keys`: key local de chinh app Python cua ban xac thuc voi proxy.
- `request-retry`: cho phep retry mot vai ma loi tam thoi.
- `remote-management.secret-key: ""`: de trong tuc la tat Management API.
- `disable-control-panel: true`: giam be mat tan cong neu ban khong can giao dien quan tri.

### Luu y quan trong

- `api-keys` o day khong phai OpenAI API key chinh thuc.
- Day chi la local auth key de app cua ban goi vao `CLIProxyAPI`.
- Khong commit thu muc `auth-dir` len git.

## 8. Dang nhap ChatGPT/Codex qua CLIProxyAPI

Mo PowerShell trong thu muc `C:\ai-lab\cli-proxy-api\`, sau do chay:

```powershell
.\cli-proxy-api.exe --codex-login
```

Neu browser khong tu mo, thu:

```powershell
.\cli-proxy-api.exe --codex-login --no-browser
```

Sau khi chay:

1. `CLIProxyAPI` se khoi dong local callback.
2. Browser se dua ban toi trang dang nhap/OAuth.
3. Ban dang nhap tai khoan ChatGPT/Codex.
4. Token se duoc luu vao `auth-dir`.

Neu dang nhap thanh cong, sau nay ban khong can dang nhap lai moi lan, tru khi token het han hoac ban xoa thu muc auth.

## 9. Chay proxy server

Van trong thu muc `C:\ai-lab\cli-proxy-api\`, chay:

```powershell
.\cli-proxy-api.exe --config .\config.yaml
```

Neu thanh cong, hay giu cua so nay mo. Day la process local server cua ban.

### Ban dang mong doi dieu gi

Ban dang mong doi mot local endpoint tuong tu:

- `http://127.0.0.1:8317/v1`

Va app Python sau nay se goi vao endpoint nay.

## 10. Kiem tra proxy truoc khi dung DSPy

Buoc nay rat dang lam. Neu proxy chua song ma ban vao DSPy ngay, ban se ton thoi gian debug nham cho Python.

Tao mot PowerShell moi va thu goi request don gian:

```powershell
$headers = @{
  Authorization = "Bearer sk-local-dspy"
  "Content-Type" = "application/json"
}

$body = @{
  model = "gpt-5"
  messages = @(
    @{
      role = "user"
      content = "Tra loi dung 5 tu: xin chao tu PowerShell"
    }
  )
  temperature = 0
} | ConvertTo-Json -Depth 10

Invoke-RestMethod `
  -Method Post `
  -Uri "http://127.0.0.1:8317/v1/chat/completions" `
  -Headers $headers `
  -Body $body
```

Neu request tra ve JSON hop le, proxy cua ban da san sang.

### Neu `gpt-5` khong chay

Thu cac model ten khac ma tai khoan cua ban co:

- `gpt-5`
- `gpt-5-codex`

Cach chac an nhat la goi `/v1/models` de xem model nao dang duoc proxy phat ra.

## 11. Tao moi truong Python cho DSPy

Trong thu muc app Python, vi du `C:\ai-lab\dspy-app\`, chay:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -U pip
pip install -U dspy openai python-dotenv
```

Neu ban muon hoc optimizer co dataset mau, cai them:

```powershell
pip install -U datasets
```

## 12. Tao file .env

Trong `C:\ai-lab\dspy-app\`, tao file `.env`:

```env
LOCAL_PROXY_BASE=http://127.0.0.1:8317/v1
LOCAL_PROXY_API_KEY=sk-local-dspy
DSPY_MODEL=openai/gpt-5
```

Neu ban lam viec code-heavy va tai khoan cho phep, co the thu:

```env
DSPY_MODEL=openai/gpt-5-codex
```

## 13. Ket noi DSPy voi CLIProxyAPI

Day la mau Python toi thieu:

```python
import os
from dotenv import load_dotenv
import dspy

load_dotenv()

lm = dspy.LM(
    os.environ["DSPY_MODEL"],
    api_base=os.environ["LOCAL_PROXY_BASE"],
    api_key=os.environ["LOCAL_PROXY_API_KEY"],
    model_type="chat",
)

dspy.configure(lm=lm)
```

### Vi sao phai dat model nhu `openai/gpt-5`

DSPy ho tro cac provider thong qua LiteLLM. Theo tai lieu DSPy, neu nha cung cap cua ban co `OpenAI-compatible endpoint` thi ban chi can:

- them tien to `openai/` vao ten model
- tro `api_base` toi endpoint cua provider
- truyen `api_key` ma provider do yeu cau

Trong bai nay:

- provider do chinh la local `CLIProxyAPI`
- `api_base` la `http://127.0.0.1:8317/v1`
- `api_key` la local key trong `config.yaml`

## 14. Viet module DSPy dau tien

Tao file `main.py`:

```python
import os

from dotenv import load_dotenv
import dspy


class AnswerQuestion(dspy.Signature):
    """Tra loi ngan gon, ro rang, bang tieng Viet."""

    question = dspy.InputField()
    answer = dspy.OutputField()


def build_lm() -> dspy.LM:
    load_dotenv()
    return dspy.LM(
        os.environ["DSPY_MODEL"],
        api_base=os.environ["LOCAL_PROXY_BASE"],
        api_key=os.environ["LOCAL_PROXY_API_KEY"],
        model_type="chat",
        temperature=0.2,
    )


def main() -> None:
    dspy.configure(lm=build_lm())
    qa = dspy.ChainOfThought(AnswerQuestion)

    result = qa(question="Lap ke hoach hoc DSPy trong 7 ngay cho nguoi moi.")

    print("Answer:")
    print(result.answer)


if __name__ == "__main__":
    main()
```

Chay:

```powershell
python .\main.py
```

## 15. Tu duy dung DSPy cho dung

Rat nhieu nguoi moi vao DSPy se co xu huong:

- viet prompt dai trong mot string
- nhan that nhieu logic vao mot buoc duy nhat
- khong tao metric de danh gia

DSPy hop hon khi ban:

- tach bai toan thanh module nho
- mo ta `input -> output` ro rang
- dat metric de do chat luong
- de optimizer tu cai thien prompt/noi suy cho tung module

Vi vay, thay vi:

```text
"Hay doc van ban nay, rut trich, danh nhan, giai thich, va de xuat..."
```

hay nghi theo kieu:

1. `extract_facts`
2. `classify_intent`
3. `draft_answer`
4. `critique_answer`

Moi buoc la mot DSPy module rieng.

## 16. Vi du pipeline 2 buoc

Day la mot vi du don gian hon nhieu workflow that:

```python
import os

from dotenv import load_dotenv
import dspy


class ExtractNeed(dspy.Signature):
    """Rut trich nhu cau chinh cua nguoi dung."""

    message = dspy.InputField()
    need = dspy.OutputField()


class BuildPlan(dspy.Signature):
    """Lap ke hoach hanh dong cu the bang tieng Viet."""

    need = dspy.InputField()
    plan = dspy.OutputField()


class Planner(dspy.Module):
    def __init__(self):
        super().__init__()
        self.extract = dspy.ChainOfThought(ExtractNeed)
        self.plan = dspy.ChainOfThought(BuildPlan)

    def forward(self, message):
        extracted = self.extract(message=message)
        planned = self.plan(need=extracted.need)
        return dspy.Prediction(
            need=extracted.need,
            plan=planned.plan,
        )


def build_lm():
    load_dotenv()
    return dspy.LM(
        os.environ["DSPY_MODEL"],
        api_base=os.environ["LOCAL_PROXY_BASE"],
        api_key=os.environ["LOCAL_PROXY_API_KEY"],
        model_type="chat",
    )


dspy.configure(lm=build_lm())
app = Planner()
result = app(message="Toi muon hoc DSPy de xay chatbot hoi dap noi bo cho cong ty.")

print("Need:", result.need)
print()
print("Plan:", result.plan)
```

## 17. Toi uu bang DSPy optimizer

Day la noi stack nay that su "ngon". Ban khong chi goi model; ban co the toi uu chuong trinh LM cua minh.

### Cach nghi dung

Ban can 3 thu:

1. mot program DSPy
2. mot trainset nho nhung dai dien
3. mot metric ro rang

### Vi du toi thieu voi MIPROv2

```python
import os

from dotenv import load_dotenv
import dspy


class ClassifyUrgency(dspy.Signature):
    """Phan loai muc do khan cap cua tin nhan."""

    text = dspy.InputField()
    label = dspy.OutputField(desc="mot trong ba gia tri: low, medium, high")


def metric(example, pred, trace=None):
    return example.label.strip().lower() == pred.label.strip().lower()


load_dotenv()
lm = dspy.LM(
    os.environ["DSPY_MODEL"],
    api_base=os.environ["LOCAL_PROXY_BASE"],
    api_key=os.environ["LOCAL_PROXY_API_KEY"],
    model_type="chat",
)
dspy.configure(lm=lm)

classifier = dspy.ChainOfThought(ClassifyUrgency)

trainset = [
    dspy.Example(text="May in van hoat dong, can thay giay trong ngay mai.", label="low").with_inputs("text"),
    dspy.Example(text="Khach hang bao don hang tre 2 ngay, can phan hoi hom nay.", label="medium").with_inputs("text"),
    dspy.Example(text="He thong thanh toan sap ngung hoat dong tren production.", label="high").with_inputs("text"),
]

optimizer = dspy.MIPROv2(
    metric=metric,
    auto="light",
    num_threads=4,
)

optimized_classifier = optimizer.compile(
    classifier,
    trainset=trainset,
)

print(optimized_classifier(text="Website dang loi checkout va khach khong tra tien duoc.").label)
```

### Luu y ve chi phi va toc do

Theo tai lieu DSPy, optimizer co the ton tu vai xu den vai USD, hoac nhieu hon tuy model, du lieu, va cau hinh. Ban nen:

- bat dau bang trainset nho
- dung `auto="light"` truoc
- khong nem ngay hang tram mau vao lan dau

## 18. Chon model nao trong stack nay

Huong dan thuc dung:

- `openai/gpt-5`: hop bai toan tong quat, viet, tong hop, extraction
- `openai/gpt-5-codex`: hop bai toan code-heavy, planning ky thuat, refactor, bug-fix

Nhung can nho:

- Ten model thuc te phu thuoc vao tai khoan va channel OAuth ma `CLIProxyAPI` dang expose.
- Dung `/v1/models` de xac minh thay vi doan.

## 19. Kich ban ung dung rat hop voi combo nay

Combo nay hop cho:

- structured extraction
- support triage
- email classification
- RAG co nhieu buoc
- agent workflow co tool
- code review tro giup noi bo

Vi sao?

- `CLIProxyAPI` cho ban endpoint local de cac framework goi vao.
- `DSPy` cho ban layer "lap trinh LM" dung nghia, khong chi la chat.

## 20. Bao mat va van hanh

Day la checklist toi thieu:

- chi bind proxy vao `127.0.0.1`
- khong day `auth-dir` len git
- khong nham `api-keys` local voi OpenAI API key that
- neu mo ra LAN/WAN, phai xem lai TLS, auth, management secret, proxy headers, va logging
- khong luu token trong repo
- khong de process proxy chay long tong tren may chia se chung

Neu ban chua can remote access, giu he thong local-only la lua chon an toan nhat.

## 21. Loi thuong gap va cach xu ly

### Loi 1: `Connection refused`

Nguyen nhan thuong gap:

- proxy chua chay
- sai port
- `LOCAL_PROXY_BASE` thieu `/v1`

Cach xu ly:

- mo lai cua so dang chay `cli-proxy-api.exe`
- kiem tra `http://127.0.0.1:8317/v1`

### Loi 2: `401 Unauthorized`

Nguyen nhan:

- sai `Authorization` bearer token khi goi local proxy
- `api-keys` trong `config.yaml` khong khop voi app Python

Cach xu ly:

- doi chieu `LOCAL_PROXY_API_KEY`
- doi chieu `config.yaml`

### Loi 3: Model not found

Nguyen nhan:

- ten model doan sai
- tai khoan cua ban khong expose model do

Cach xu ly:

- goi `/v1/models`
- thu `gpt-5` truoc, roi `gpt-5-codex`

### Loi 4: Dang nhap OAuth thanh cong nhung request van fail

Nguyen nhan:

- token het han
- auth cache loi
- provider route bi thay doi sau update

Cach xu ly:

- dang nhap lai
- xoa `auth-dir` neu can, roi login lai
- nang cap `CLIProxyAPI` len release moi hon

### Loi 5: DSPy tra ve output loang ngoang, parse kem

Nguyen nhan:

- signature qua mo ho
- output field khong du ro
- nhiet do qua cao

Cach xu ly:

- mo ta field ro hon
- giam `temperature`
- tach mot module lon thanh 2-3 module nho

## 22. Khac biet giua luong nay va OpenAI chinh thuc

Luong trong guide nay:

- `DSPy` -> `CLIProxyAPI` -> `ChatGPT/Codex OAuth`

Luong OpenAI API chinh thuc:

- app cua ban -> OpenAI API -> su dung API key chinh thuc

Luong ChatGPT tool integration chinh thuc:

- `Developer mode` + `MCP`

Hay chon dung duong:

- neu ban muon official API cho app: di theo OpenAI API
- neu ban muon dua tools/data vao ChatGPT: xem `Developer mode` + `MCP`
- neu ban muon local bridge de thu nghiem voi DSPy: guide nay phu hop

## 23. Checklist "chay phat an ngay"

Neu ban chi can luong ngan nhat:

1. Tai `CLIProxyAPI` ve may.
2. Tao `config.yaml` nhu mau.
3. Chay `.\cli-proxy-api.exe --codex-login`.
4. Chay `.\cli-proxy-api.exe --config .\config.yaml`.
5. Test `POST /v1/chat/completions` bang PowerShell.
6. Tao `.venv`, cai `dspy openai python-dotenv`.
7. Dat `.env` voi `LOCAL_PROXY_BASE`, `LOCAL_PROXY_API_KEY`, `DSPY_MODEL`.
8. Chay script DSPy mau.
9. Sau khi chay on dinh, moi bat dau toi uu bang `MIPROv2`.

## 24. Script mau co san trong repo nay

Repo nay da co them file:

- `scripts/dspy_cliproxyapi_chatgpt_demo.py`

Ban co the chay no sau khi cai dependency va dat bien moi truong:

```powershell
.\.venv\Scripts\Activate.ps1
$env:LOCAL_PROXY_BASE="http://127.0.0.1:8317/v1"
$env:LOCAL_PROXY_API_KEY="sk-local-dspy"
$env:DSPY_MODEL="openai/gpt-5"
python .\scripts\dspy_cliproxyapi_chatgpt_demo.py
```

## 25. Muc mo rong tiep theo nen lam

Sau khi stack chay on, thu nang cap theo thu tu nay:

1. viet 1 module that nho cho bai toan cua ban
2. them test input/output
3. gom 20-50 mau trainset nho
4. viet metric danh gia
5. chay `MIPROv2`
6. doi chieu truoc va sau optimize
7. moi tinh den RAG, tools, ReAct, hay pipeline phuc tap

## 26. Nguon tham khao

- DSPy home va getting started: <https://dspy.ai/>
- CLIProxyAPI basic configuration: <https://help.router-for.me/configuration/basic>
- CLIProxyAPI configuration options: <https://help.router-for.me/configuration/options>
- CLIProxyAPI GitHub releases: <https://github.com/router-for-me/CLIProxyAPI/releases>
- CLIProxyAPI Codex client guide: <https://help.router-for.me/agent-client/codex>
- OpenAI MCP guide: <https://platform.openai.com/docs/mcp/>
- OpenAI Developer mode guide: <https://developers.openai.com/api/docs/guides/developer-mode>

## 27. Ket luan ngan

Neu noi ngan gon:

- `CLIProxyAPI` giup ban co endpoint local de goi model
- `DSPy` giup ban bien viec "goi model" thanh "lap trinh he thong LM"
- `ChatGPT/Codex` dong vai tro tai khoan nguon phia sau

Khi ba manh ghep nay khop nhau, ban co mot local AI lab rat manh de thu nghiem prompt pipeline, module, optimizer, va agent workflow ma khong phai bat dau tu mot backend phuc tap.
