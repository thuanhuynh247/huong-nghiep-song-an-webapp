window.COURSE_DATA = {
  totalMinutes: 186,
  modules: [
    {
      id: "meet-claude",
      title: "Gặp Claude",
      description: "Hiểu Claude là gì, cách bắt đầu hội thoại, cải thiện kết quả và chọn đúng chế độ làm việc."
    },
    {
      id: "organize-work",
      title: "Tổ chức công việc và tri thức",
      description: "Dùng Projects, Artifacts và Skills để biến hội thoại thành quy trình làm việc có thể lặp lại."
    },
    {
      id: "expand-reach",
      title: "Mở rộng phạm vi của Claude",
      description: "Kết nối công cụ, tìm kiếm trong doanh nghiệp và dùng Research cho điều tra nhiều bước."
    },
    {
      id: "put-it-together",
      title: "Ghép mọi thứ lại",
      description: "Xem use case theo vai trò, các sản phẩm Claude khác và phần tổng kết cuối khóa."
    }
  ],
  lessons: [
    {
      id: "what-is-claude",
      number: "Bài 01",
      moduleId: "meet-claude",
      module: "Gặp Claude",
      title: "Claude là gì?",
      time: "15 phút",
      objectives: [
        "Giải thích Claude là gì và các nguyên tắc định hướng thiết kế của nó.",
        "Mô tả các năng lực cốt lõi của Claude và lý do Claude khác với một chatbot đơn giản.",
        "Nhận biết các cách truy cập Claude qua web, desktop và mobile."
      ],
      highlights: [
        "Claude được xây dựng xoay quanh ba nguyên tắc: hữu ích, vô hại và trung thực.",
        "Claude không chỉ để trả lời câu hỏi, mà là một đối tác tư duy cho nhiều loại công việc.",
        "Claude có thể được điều hướng khá tốt về giọng điệu, hành vi và cách phản hồi.",
        "Bạn có thể dùng Claude xuyên suốt nhiều thiết bị và nhiều giao diện khác nhau."
      ],
      blocks: [
        {
          title: "Video mở đầu",
          paragraphs: [
            "Phần video giới thiệu Claude như một đối tác tư duy thay vì chỉ là chatbot. Mục tiêu là giúp bạn thấy Claude phù hợp với các tác vụ phân tích, viết, nghiên cứu và giải quyết vấn đề thực tế như thế nào."
          ]
        },
        {
          title: "Claude có gì đặc biệt?",
          pairs: [
            {
              label: "Hiến pháp AI",
              text: "Ở cấp độ khái quát, Claude được huấn luyện để tránh tạo ra nội dung độc hại hoặc phân biệt đối xử, tránh hỗ trợ các hành vi phi pháp hoặc phi đạo đức và hành xử minh bạch hơn với con người."
            },
            {
              label: "Không chỉ là chatbot",
              text: "Claude làm tốt các việc như tóm tắt, tra cứu, viết sáng tạo, cộng tác viết, hỏi đáp, coding và phân tích. Cách hữu ích nhất là coi Claude như một người đồng hành giải quyết bài toán phức tạp."
            },
            {
              label: "Dễ điều hướng",
              text: "Bạn có thể chỉ định tính cách, giọng điệu, độ trang trọng hoặc cách phản hồi. Vì thế đầu ra thường bám ý hơn nếu bạn mô tả rõ điều mình muốn."
            },
            {
              label: "Có mặt ở nơi bạn làm việc",
              text: "Claude có trên web, desktop và mobile. Khi đăng nhập cùng tài khoản, cuộc trò chuyện, project, memory và preference sẽ đồng bộ giữa các thiết bị."
            }
          ]
        },
        {
          title: "Những nhóm tác vụ Claude làm tốt",
          bullets: [
            "Viết và tạo nội dung: cùng bạn xây email, bài đăng mạng xã hội, báo cáo hay các tài liệu dài với giọng điệu có thể chỉnh dần.",
            "Nghiên cứu và phân tích: gom nhiều nguồn, tóm lược phát hiện và giúp đọc tài liệu dài nhờ context window lớn.",
            "Hỗ trợ lập trình: có thể viết, giải thích, debug code nhiều ngôn ngữ; phần nội dung gốc nhấn mạnh mạnh về Claude Opus 4.5 cho coding.",
            "Giải quyết vấn đề và suy luận: xử lý bài toán logic, toán học, chiến lược hoặc nghiên cứu cần phân tích kỹ.",
            "Học điều mới: Claude có thể thích ứng với nhịp học của bạn; learning mode tập trung vào dẫn dắt cách suy nghĩ thay vì chỉ trả lời luôn."
          ]
        },
        {
          title: "Các cách truy cập Claude",
          bullets: [
            "Claude.ai là giao diện chính cho đa số người dùng: chat, brainstorm, viết, phân tích, nghiên cứu và tạo file.",
            "Claude Code là công cụ tác tử cho lập trình và thao tác file trên desktop, có thể sửa file, chạy lệnh và tạo commit.",
            "Claude trong Slack cho phép hỏi ngay trong thread, dùng ngữ cảnh từ kênh chat, tin nhắn trực tiếp và file chia sẻ.",
            "Claude for Excel đặt Claude vào sidebar của Excel để đọc, phân tích, sửa workbook, giải thích công thức và làm việc đa sheet."
          ]
        }
      ],
      reflection: [
        "Trong lịch làm việc hiện tại của bạn, tác vụ nào sẽ hưởng lợi nhất nếu có một đối tác tư duy như Claude đồng hành?"
      ],
      next: "Bài tiếp theo sẽ hướng dẫn cách bắt đầu cuộc trò chuyện đầu tiên với Claude và cách điều khiển phản hồi hiệu quả hơn."
    },
    {
      id: "first-conversation",
      number: "Bài 02",
      moduleId: "meet-claude",
      module: "Gặp Claude",
      title: "Cuộc trò chuyện đầu tiên với Claude",
      time: "20 phút",
      objectives: [
        "Bắt đầu cuộc trò chuyện mới và điều hướng giao diện Claude.",
        "Viết prompt hiệu quả bằng ngôn ngữ rõ ràng, cụ thể.",
        "Tải file hoặc hình ảnh để cung cấp thêm ngữ cảnh cho Claude.",
        "Dùng follow-up message để lặp và tinh chỉnh phản hồi."
      ],
      highlights: [
        "Claude mạnh nhất khi bạn xem nó như một cộng sự: Claude mang năng lực AI, còn bạn mang ngữ cảnh và chuyên môn.",
        "Cách nói chuyện tốt nhất với Claude là tự nhiên, ngắn gọn, gần giống cách bạn nói với đồng nghiệp.",
        "Một prompt tốt thường có ba phần: bối cảnh, nhiệm vụ và quy tắc đầu ra.",
        "Sức mạnh thực sự của Claude đến từ đối thoại nhiều lượt chứ không phải một prompt duy nhất."
      ],
      blocks: [
        {
          title: "Bắt đầu như thế nào",
          paragraphs: [
            "Khi mở Claude.ai, bạn sẽ thấy một giao diện gọn với ô nhập ở cuối màn hình. Prompt có thể chỉ là một câu hỏi đơn giản hoặc một yêu cầu phức tạp để cùng tạo file, phân tích dữ liệu hay xây tài liệu."
          ]
        },
        {
          title: "Khung viết prompt cơ bản",
          pairs: [
            {
              label: "Đặt bối cảnh",
              text: "Cho Claude biết bạn là ai, mục tiêu là gì và có điều gì trong công việc mà Claude cần hiểu để trả lời đúng hơn."
            },
            {
              label: "Xác định nhiệm vụ",
              text: "Nêu rõ bạn muốn Claude làm gì: viết, phân tích, xây dựng, nghiên cứu hay đề xuất."
            },
            {
              label: "Quy định đầu ra",
              text: "Chỉ rõ phong cách, giọng điệu, định dạng và ví dụ nếu có. Đây là cách giảm mơ hồ và tăng độ nhất quán."
            }
          ]
        },
        {
          title: "Ví dụ prompt được ghép từ ba phần",
          quote: "Tôi là trưởng nhóm marketing tại một startup streaming phim độc lập và đang chuẩn bị pitch deck cho nhà đầu tư. Hãy nghiên cứu thị trường streaming phim độc lập hiện nay, xác định xu hướng chính, vị thế cạnh tranh và cơ hội tăng trưởng. Dùng nghiên cứu web có trích dẫn và trình bày thành một báo cáo chuyên nghiệp."
        },
        {
          title: "Thêm ngữ cảnh bằng file và hình ảnh",
          bullets: [
            "Tải tài liệu lên để Claude tóm tắt các ý chính.",
            "Gửi hình ảnh để Claude mô tả hoặc phân tích nội dung trực quan.",
            "Đính kèm bảng tính để Claude tìm xu hướng trong dữ liệu.",
            "Tải code để Claude giải thích cách hoạt động hoặc tìm lỗi.",
            "Nếu bạn có các preference lặp đi lặp lại, có thể cài trong Settings để Claude luôn nhớ."
          ]
        },
        {
          title: "Lặp lại và tinh chỉnh",
          bullets: [
            "Hỏi tiếp để đào sâu: ví dụ xin mở rộng điểm số 2 hoặc làm câu trả lời ngắn gọn hơn.",
            "Phản hồi trực tiếp: nói rõ điều bạn thích hoặc chưa thích, chẳng hạn giọng điệu còn quá trang trọng.",
            "Đổi hướng hoặc bắt đầu chat mới nếu cuộc trò chuyện đã lệch bối cảnh quá xa."
          ]
        }
      ],
      reflection: [
        "Trước khi sang bài tiếp theo, hãy thử hỏi Claude một việc thật đang nằm trong công việc của bạn thay vì một ví dụ giả định."
      ],
      next: "Bài tiếp theo sẽ đi sâu vào cách cho Claude định hướng rõ hơn để kết quả sát ý và hữu ích hơn."
    },
    {
      id: "better-results",
      number: "Bài 03",
      moduleId: "meet-claude",
      module: "Gặp Claude",
      title: "Cách nhận kết quả tốt hơn",
      time: "15 phút",
      objectives: [
        "Nhận ra các vấn đề thường gặp khi mới làm việc với AI và biết cách xử lý.",
        "Hiểu AI Fluency là gì và nên học sâu ở đâu.",
        "Biết cách thiết lập các eval đơn giản để kiểm tra Claude với workflow riêng của bạn."
      ],
      highlights: [
        "Prompt đầu tiên hiếm khi hoàn hảo; tư duy lặp là bình thường và cần thiết.",
        "AI Fluency là khả năng cộng tác hiệu quả với AI chứ không chỉ biết bấm nút nào.",
        "Các eval nhẹ giúp bạn biết Claude phù hợp với khâu nào trong quy trình thật."
      ],
      blocks: [
        {
          title: "Những trục trặc thường gặp và cách xử lý",
          pairs: [
            {
              label: "Phản hồi quá chung chung",
              text: "Thường do prompt thiếu bối cảnh. Hãy thêm người nhận, vai trò, ràng buộc và tình huống cụ thể thay vì mô tả quá chung."
            },
            {
              label: "Câu trả lời quá dài hoặc quá ngắn",
              text: "Claude đang đoán độ dài phù hợp. Hãy chỉ rõ như 'tóm tắt 2 đoạn', 'dưới 100 từ' hoặc 'phân tích toàn diện, không giới hạn độ dài'."
            },
            {
              label: "Không đúng định dạng",
              text: "Claude có thể hiểu bạn muốn gì nhưng chưa biết trình bày ra sao. Hãy đưa ví dụ hoặc mô tả cấu trúc thật rõ."
            },
            {
              label: "Thông tin nghe có vẻ đúng nhưng thực ra sai",
              text: "Với công việc quan trọng, hãy xác minh độc lập các dữ kiện then chốt. Có thể yêu cầu Claude trích nguồn hoặc nêu mức độ tự tin."
            },
            {
              label: "Giọng điệu chưa đúng",
              text: "Claude mặc định thiên về hữu ích và chuyên nghiệp. Hãy nói thẳng kiểu bạn muốn như tự nhiên hơn, trang trọng hơn hoặc quyết đoán hơn."
            }
          ]
        },
        {
          title: "Tư duy lặp",
          bullets: [
            "Hãy coi bản trả lời đầu tiên là bản nháp mở đầu, không phải kết quả cuối cùng.",
            "Phản hồi càng cụ thể thì vòng tinh chỉnh càng nhanh: nói chính xác phần nào cần cắt, phần nào cần nhấn mạnh.",
            "Nếu cuộc chat đi quá lệch hướng, bắt đầu một cuộc trò chuyện mới thường nhanh hơn cố cứu bối cảnh cũ."
          ]
        },
        {
          title: "AI Fluency và khung 4D",
          bullets: [
            "Delegation: quyết định phần việc nào nên do người làm, phần nào để AI làm và cách chia việc hợp lý.",
            "Description: mô tả đầu ra, quy trình và hành vi mong muốn của AI một cách rõ ràng.",
            "Discernment: đánh giá phản hồi của AI một cách phản biện về độ đúng, độ phù hợp và chất lượng.",
            "Diligence: dùng AI có trách nhiệm, minh bạch và chịu trách nhiệm với công việc được hỗ trợ bởi AI."
          ]
        },
        {
          title: "Eval đơn giản cho workflow thật",
          bullets: [
            "Thu thập 5 đến 10 ví dụ của một tác vụ bạn thường làm như email, báo cáo hoặc phân tích.",
            "Viết prompt sao cho tái tạo được loại đầu ra tương tự với bối cảnh bạn thường có.",
            "So sánh kết quả của Claude với ví dụ thật: có nắm đúng thông tin chính không, giọng điệu có ổn không, thiếu điều gì.",
            "Tinh chỉnh prompt hoặc thêm ví dụ tốt để Claude bắt chước tiêu chuẩn bạn muốn.",
            "Ví dụ với phân tích dữ liệu: đem một dataset từng phân tích thủ công cho Claude làm thử, rồi so với kết quả gốc để xem Claude làm đúng phần nào và bỏ sót mẫu nào."
          ]
        }
      ],
      reflection: [
        "Bạn đã vấp phải những lỗi nào trong số trên?",
        "Một eval nhỏ ở đâu trong công việc sẽ giúp bạn biết Claude có phù hợp với tác vụ lặp lại hay không?"
      ],
      next: "Module tiếp theo sẽ đưa bạn sang cách tổ chức công việc với Claude, bắt đầu bằng Projects."
    },
    {
      id: "desktop-chat-cowork-code",
      number: "Bài 04",
      moduleId: "meet-claude",
      module: "Gặp Claude",
      title: "Claude desktop app: Chat, Cowork, Code",
      time: "6 phút",
      objectives: [
        "Nhận biết ba chế độ Chat, Cowork và Code trong desktop app.",
        "Hiểu các tính năng riêng của từng chế độ như quick entry, scheduled tasks và local/remote development.",
        "Chọn đúng chế độ theo loại công việc cần làm."
      ],
      highlights: [
        "Chat phù hợp cho hỏi đáp nhanh, brainstorm, soạn thảo và đối thoại qua lại.",
        "Cowork dành cho nghiên cứu, phân tích và tạo deliverable dài hơi từ nhiều nguồn.",
        "Code đặt Claude vào đúng môi trường phát triển để đọc codebase, chỉnh file và chạy lệnh."
      ],
      blocks: [
        {
          title: "Tổng quan ba chế độ",
          paragraphs: [
            "Desktop app cho bạn ba cách làm việc với Claude. Chat là Claude quen thuộc trong claude.ai nhưng có lợi thế native trên máy. Cowork và Code đều chạy trên engine Claude Code ở bên dưới, cho phép tác vụ kéo dài, tự chạy nhiều bước và thậm chí dùng sub-agent."
          ]
        },
        {
          title: "Chat",
          bullets: [
            "Dùng cho câu hỏi nhanh, brainstorm, viết nháp và xử lý vấn đề theo kiểu đối thoại.",
            "Quick entry: trên Mac có thể double-tap phím Option để gọi Claude lên ngay trên màn hình hiện tại.",
            "Screenshot và share window giúp Claude nhìn đúng thứ bạn đang nhìn thay vì bạn phải mô tả lại.",
            "Dictation hữu ích khi suy nghĩ thành lời hoặc không tiện gõ.",
            "Desktop connectors cho phép Claude làm việc với các công cụ cục bộ trên máy."
          ]
        },
        {
          title: "Cowork",
          bullets: [
            "Phù hợp cho việc cần nhiều công sức: nghiên cứu nhiều nguồn, phân tích, rà soát tài liệu và tạo ra deliverable hoàn chỉnh.",
            "Claude thường hỏi thêm vài câu trước khi bắt đầu để chốt phạm vi, format và ràng buộc.",
            "Có thể truy cập folder bạn chia sẻ, đọc file liên quan và lưu kết quả trở lại đúng chỗ.",
            "Scheduled tasks giúp tự động hóa việc lặp lại như daily brief, weekly roundup hoặc inbox triage.",
            "Claude in Chrome cho Cowork khả năng thao tác trang web, lấy dữ liệu từ các site không có API.",
            "Plugins bổ sung năng lực chuyên biệt như dữ liệu tài chính thời gian thực hoặc tra cứu tri thức nội bộ."
          ]
        },
        {
          title: "Code",
          bullets: [
            "Code đem toàn bộ môi trường phát triển vào app: đọc codebase, sửa file, chạy lệnh, xem diff và dùng git để theo dõi phiên bản.",
            "Local mode: Claude làm việc trực tiếp trong folder trên máy bạn, có thể chạy dev server để bạn xem trước.",
            "Remote mode: Claude làm việc với repo GitHub trong môi trường cloud, phù hợp cho refactor lớn hoặc codebase nặng.",
            "Ba mode tương tác: Ask để mọi thay đổi đều chờ duyệt, Code để tự sửa file nhưng hỏi trước khi chạy lệnh, Plan để trình kế hoạch trước khi đụng vào project."
          ]
        },
        {
          title: "Khi nào nên dùng chế độ nào?",
          pairs: [
            {
              label: "Chat",
              text: "Tốt cho trao đổi ngắn, học hỏi qua hội thoại, viết nháp, hỏi đáp và xử lý vấn đề nhẹ."
            },
            {
              label: "Cowork",
              text: "Tốt cho nghiên cứu dài hơi, phân tích đa nguồn, tổ chức file, viết brief và tài liệu hoàn chỉnh."
            },
            {
              label: "Code",
              text: "Tốt cho xây phần mềm, test, chạy lệnh, debug, deploy và làm việc trực tiếp với codebase."
            }
          ]
        }
      ],
      reflection: [
        "Nhìn lại các việc bạn hay dùng Claude nhất, việc nào nên đưa về Chat, việc nào hợp Cowork, việc nào cần Code?"
      ],
      next: "Bài tiếp theo đi vào Projects, nơi bạn gom ngữ cảnh, tài liệu và hướng dẫn làm việc dài hạn với Claude."
    }
    ,
    {
      id: "projects",
      number: "Bài 05",
      moduleId: "organize-work",
      module: "Tổ chức công việc và tri thức",
      title: "Giới thiệu Projects",
      time: "20 phút",
      objectives: [
        "Giải thích Projects là gì và khi nào nên dùng.",
        "Tạo project mới với tên, mô tả và thiết lập quyền hiển thị.",
        "Thêm tài liệu vào knowledge base của project.",
        "Viết project instructions để dẫn hướng Claude.",
        "Chia sẻ project với đồng đội nếu dùng Claude for Work."
      ],
      highlights: [
        "Projects là workspace tách biệt với memory, chat history, knowledge base và instruction riêng.",
        "Knowledge base giúp Claude tham chiếu tài liệu trên mọi cuộc trò chuyện trong project mà không cần upload lại.",
        "Project instructions áp dụng cho toàn bộ chat trong project và có thể điều khiển tone, level chuyên môn, cách phản hồi.",
        "Khi knowledge base lớn, Claude có thể tự chuyển sang cơ chế RAG để mở rộng sức chứa mà vẫn giữ chất lượng."
      ],
      blocks: [
        {
          title: "Khi nào nên tạo Project",
          bullets: [
            "Khi bạn có tài liệu tham chiếu dùng đi dùng lại như note họp, khảo sát, báo cáo hay dữ liệu lịch sử.",
            "Khi bạn muốn Claude luôn phản hồi theo một bộ yêu cầu ổn định như phải cite nguồn, dùng đúng template hoặc giữ đúng giọng điệu.",
            "Khi nhiều thành viên cần cùng làm việc trên một nền ngữ cảnh chung."
          ]
        },
        {
          title: "Cách tạo project đầu tiên",
          bullets: [
            "Vào mục Projects ở sidebar hoặc truy cập trực tiếp claude.ai/projects.",
            "Chọn New Project và đặt tên mô tả đúng mục đích như 'Q4 Marketing Campaign' hoặc 'Product Documentation'.",
            "Thêm phần mô tả ngắn để bạn và đồng đội hiểu project dùng làm gì.",
            "Chọn visibility: private hoặc chia sẻ với tổ chức nếu bạn dùng Claude for Work."
          ]
        },
        {
          title: "Project instructions nên viết gì",
          bullets: [
            "Bối cảnh: project này phục vụ mảng nào, ví dụ tạo content marketing cho sản phẩm B2B.",
            "Quy trình: ví dụ luôn nghĩ trước cấu trúc bài rồi mới viết bản nháp.",
            "Tone và style: chuyên nghiệp nhưng tự nhiên, tránh jargon nếu không cần.",
            "Yêu cầu bắt buộc: ví dụ mọi marketing copy đều phải có call-to-action ở cuối."
          ]
        },
        {
          title: "Xây knowledge base",
          bullets: [
            "Upload PDF, DOCX, CSV, TXT, HTML và nhiều định dạng khác, hoặc kết nối Google Drive.",
            "Nên đưa lên brand guideline, style guide, template, research report, meeting notes, requirement docs và các ví dụ tốt để Claude học chuẩn đầu ra.",
            "Đặt tên file có ý nghĩa vì Claude dùng cả tên file để hiểu và truy hồi đúng tài liệu."
          ]
        },
        {
          title: "Knowledge base lớn và RAG",
          paragraphs: [
            "Khi lượng tài liệu tiến gần giới hạn context window, Claude có thể tự bật Retrieval Augmented Generation. Thay vì nhồi toàn bộ tài liệu vào bộ nhớ cùng lúc, Claude chỉ truy hồi phần liên quan nhất cho câu hỏi hiện tại, nhờ vậy sức chứa có thể tăng lên nhiều lần."
          ]
        },
        {
          title: "Cộng tác trong Claude for Work",
          pairs: [
            {
              label: "Can view",
              text: "Được xem nội dung, tri thức và chat trong project nhưng không sửa được cài đặt."
            },
            {
              label: "Can edit",
              text: "Có thể sửa instructions, cập nhật knowledge, quản lý thành viên và cùng cộng tác chủ động."
            },
            {
              label: "Owner",
              text: "Quản lý toàn bộ project, bao gồm quyền chia sẻ với người cụ thể hoặc cả tổ chức."
            }
          ]
        },
        {
          title: "Ví dụ project gợi ý",
          bullets: [
            "Hub cho product launch với spec, competitive analysis và messaging notes.",
            "Research support gom competitive review, user research và customer feedback.",
            "Client account hub chứa brand guideline, deliverable cũ và lịch sử giao tiếp với khách hàng.",
            "Workspace cho event planning với hợp đồng địa điểm, speaker bios và attendee data.",
            "Bộ job description generator với JD cũ, team charter và tài liệu headcount request."
          ]
        },
        {
          title: "Best practices",
          bullets: [
            "Bắt đầu hẹp rồi mở rộng dần thay vì gom mọi thứ vào một project ngay từ đầu.",
            "Giữ knowledge base luôn cập nhật để tránh đầu ra lỗi thời.",
            "Viết instruction cụ thể, tránh mô tả mơ hồ.",
            "Nhóm tài liệu liên quan gần nhau để Claude dễ nối ý.",
            "Khi hỏi, có thể nhắc tên file cụ thể để Claude tập trung tìm đúng nguồn."
          ]
        }
      ],
      reflection: [
        "Công việc dài hạn nào của bạn sẽ hưởng lợi nhất nếu có một project với ngữ cảnh tồn tại lâu dài?"
      ],
      next: "Bài tiếp theo chuyển sang Artifacts, nơi Claude tạo ra đầu ra dạng tài liệu, website, diagram hoặc công cụ tương tác."
    },
    {
      id: "artifacts",
      number: "Bài 06",
      moduleId: "organize-work",
      module: "Tổ chức công việc và tri thức",
      title: "Tạo nội dung với Artifacts",
      time: "20 phút",
      objectives: [
        "Giải thích Artifacts là gì và khi nào Claude tạo artifact.",
        "Chia sẻ artifact với đồng nghiệp hoặc xuất bản công khai.",
        "Xử lý các tình huống khi artifact không hiện như mong muốn."
      ],
      highlights: [
        "Artifact là đầu ra độc lập, có cửa sổ riêng bên cạnh cuộc trò chuyện.",
        "Artifact xuất hiện khi nội dung đủ lớn, tự thân hoàn chỉnh và có khả năng bạn muốn tái sử dụng.",
        "Claude có thể tạo document, code snippet, HTML page, SVG, Mermaid diagram và React component."
      ],
      blocks: [
        {
          title: "Artifacts là gì?",
          paragraphs: [
            "Thay vì nhận một khối code hoặc text dài bị chôn trong chat, bạn sẽ thấy nội dung được render trong một khung riêng và sẵn sàng để dùng, tải về hoặc chia sẻ."
          ]
        },
        {
          title: "Những loại artifact phổ biến",
          bullets: [
            "Documents: meeting notes, report, kế hoạch dự án, blog post hay các nội dung dài cần tiếp tục chỉnh sửa.",
            "Code snippets: code chạy được trong Python, JavaScript, C++ và nhiều ngôn ngữ khác.",
            "HTML pages: trang web hoàn chỉnh với HTML, CSS và JavaScript trong một file.",
            "SVG images: logo, icon, minh họa và các phần tử hình ảnh vector.",
            "Mermaid diagrams: flowchart, sequence diagram, Gantt chart, org chart.",
            "React components: calculator, dashboard, mini game, data visualization hoặc UI tương tác thực sự."
          ]
        },
        {
          title: "Tạo artifact đầu tiên",
          bullets: [
            "Bạn chỉ cần mô tả yêu cầu; Claude sẽ tự quyết định khi nào nên trả về dạng artifact.",
            "Ví dụ yêu cầu: tạo flowchart onboarding khách hàng, dashboard chi phí hàng tháng, landing page cho app năng suất hoặc template project brief.",
            "Nếu Claude không tự mở artifact, bạn có thể nói rõ: 'Hãy tạo nội dung này dưới dạng artifact'."
          ]
        },
        {
          title: "Bạn có thể làm gì trong cửa sổ artifact",
          bullets: [
            "Chuyển giữa bản preview và code gốc.",
            "Copy nội dung để dùng ở nơi khác.",
            "Download artifact thành file.",
            "Xem chính xác Claude đã sinh ra gì ở phía dưới."
          ]
        },
        {
          title: "Chia sẻ và publish artifact",
          bullets: [
            "Copy hoặc download để dùng cá nhân hay gửi qua kênh khác.",
            "Nếu dùng Claude for Work, Team và Enterprise có thể chia sẻ artifact nội bộ trong tổ chức.",
            "Với Free, Pro và Max, bạn có thể publish public bằng link; chỉ phiên bản artifact đã chọn là public, còn chat vẫn private.",
            "Người khác có thể remix artifact để mở trong Claude của họ và chỉnh sửa tiếp."
          ]
        },
        {
          title: "Mẹo làm artifact tốt hơn",
          bullets: [
            "Mô tả rõ đầu ra mong muốn thay vì nói quá chung chung.",
            "Nói rõ ai là người dùng cuối để Claude chọn thiết kế và cấu trúc phù hợp.",
            "Lặp từng bước nhỏ, thêm từng feature một để dễ bắt lỗi.",
            "Nếu phản hồi ra chat thường thay vì artifact, cứ yêu cầu lại thật trực tiếp."
          ]
        }
      ],
      reflection: [
        "Quy trình lặp nào của bạn sẽ dễ hình dung hơn nếu chuyển thành flowchart, dashboard hoặc tool tương tác?"
      ],
      next: "Bài tiếp theo giới thiệu Skills, tức các gói chuyên môn giúp Claude làm những quy trình chuyên biệt một cách nhất quán."
    },
    {
      id: "skills",
      number: "Bài 07",
      moduleId: "organize-work",
      module: "Tổ chức công việc và tri thức",
      title: "Làm việc với Skills",
      time: "15 phút",
      objectives: [
        "Giải thích Skills là gì và Claude dùng chúng như thế nào.",
        "Nhận diện các built-in Skill của Anthropic cho việc tạo tài liệu.",
        "Bật và quản lý Skills trong phần cài đặt."
      ],
      highlights: [
        "Skills là thư mục gồm instruction, script và tài nguyên để Claude nạp động cho tác vụ chuyên biệt.",
        "Anthropic có sẵn các skill tạo file như Excel, Word, PowerPoint và PDF.",
        "Bạn cũng có thể tự tạo custom skill cho quy trình riêng của mình."
      ],
      blocks: [
        {
          title: "Skills là gì?",
          paragraphs: [
            "Bạn có thể hình dung Skills như các gói chuyên môn. Thay vì chỉ biết chung chung, Claude có thêm instruction và công cụ để thực thi một loại nhiệm vụ theo cách lặp lại và đáng tin cậy hơn."
          ]
        },
        {
          title: "Hai loại Skills",
          pairs: [
            {
              label: "Anthropic Skills",
              text: "Do Anthropic tạo và duy trì, chủ yếu tăng cường khả năng tạo tài liệu Excel, Word, PowerPoint và PDF. Claude sẽ tự gọi chúng khi phù hợp."
            },
            {
              label: "Custom Skills",
              text: "Do bạn hoặc tổ chức tự tạo cho workflow riêng như áp dụng brand guideline, chuẩn hóa meeting notes hoặc thực thi chuỗi phân tích dữ liệu."
            }
          ]
        },
        {
          title: "Cách bật Skills",
          bullets: [
            "Vào Settings > Capabilities.",
            "Bật Code execution and file creation vì Skills chạy trong sandbox tính toán an toàn.",
            "Kéo xuống phần Skills và bật hoặc tắt từng skill theo nhu cầu.",
            "Với Enterprise, owner của tổ chức phải bật Code execution và Skills trước ở Admin settings.",
            "Với Team plan, preview này mặc định bật ở cấp tổ chức."
          ]
        },
        {
          title: "Skills xuất hiện trong thực tế thế nào",
          bullets: [
            "Tạo spreadsheet theo dõi chi phí hàng tháng với công thức tổng.",
            "Biến meeting notes thành file PowerPoint.",
            "Sinh báo cáo PDF tóm tắt dữ liệu.",
            "Tạo mô hình tài chính trong Excel có scenario analysis."
          ]
        },
        {
          title: "Claude có thể thao tác trên file thật của bạn",
          paragraphs: [
            "Cùng năng lực này, Claude có thể làm việc với chính các file .xlsx, .pptx, .docx hoặc .pdf của bạn trong một môi trường cô lập. Claude có thể thêm slide, phân tích spreadsheet hoặc đề xuất chỉnh sửa tài liệu. Khi cần, bạn sẽ được nhắc bật quyền limited network access để dùng dữ liệu ngoài."
          ]
        },
        {
          title: "Lưu ý bảo mật",
          bullets: [
            "Chỉ cài custom Skill từ nguồn bạn tin cậy.",
            "Skill do Anthropic cung cấp đã được kiểm thử và duy trì.",
            "Custom Skill bạn upload là private cho tài khoản cá nhân của bạn.",
            "Nếu lấy Skill từ nguồn ngoài, nên xem trước nội dung để hiểu nó làm gì."
          ]
        },
        {
          title: "Tự tạo custom Skill bằng hội thoại",
          bullets: [
            "Mở chat mới và nói với Claude bạn muốn tạo skill cho công việc gì, ví dụ viết quarterly business review hay áp brand guideline lên presentation.",
            "Trả lời các câu hỏi Claude đặt ra về workflow, tiêu chuẩn đầu ra và hoàn cảnh sử dụng.",
            "Upload template, style guide, brand assets hoặc ví dụ đầu ra tốt để Claude học đúng chuẩn.",
            "Claude sẽ tạo file ZIP của skill; bạn tải về rồi vào Settings > Capabilities > Upload skill để cài."
          ]
        },
        {
          title: "Skills và Projects khác nhau thế nào?",
          pairs: [
            {
              label: "Projects",
              text: "Là nơi chứa tri thức và ngữ cảnh dài hạn: spec, research, note họp, tài liệu tham chiếu."
            },
            {
              label: "Skills",
              text: "Là nơi mã hóa cách làm: trình tự thao tác, phương pháp, workflow lặp lại và chuẩn đầu ra."
            }
          ]
        }
      ],
      reflection: [
        "Bạn đang tạo loại tài liệu nào thường xuyên đến mức nên biến thành skill?",
        "Workflow lặp đi lặp lại nào trong công việc rất đáng để đóng gói thành custom Skill?"
      ],
      next: "Từ bài sau, khóa học chuyển sang các công cụ mở rộng phạm vi làm việc của Claude, bắt đầu với connectors."
    }
    ,
    {
      id: "connectors",
      number: "Bài 08",
      moduleId: "expand-reach",
      module: "Mở rộng phạm vi của Claude",
      title: "Kết nối công cụ của bạn",
      time: "20 phút",
      objectives: [
        "Giải thích connectors là gì và vì sao chúng quan trọng.",
        "Biết cách vào thư mục connectors và thiết lập kết nối đầu tiên.",
        "Dùng các công cụ đã kết nối hiệu quả trong cuộc trò chuyện với Claude."
      ],
      highlights: [
        "Connectors biến Claude từ trợ lý chung thành cộng sự nắm được dữ liệu thật của bạn.",
        "Tùy connector và quyền cấp, Claude có thể đọc thông tin hoặc thực thi hành động thay bạn.",
        "Model Context Protocol là chuẩn mở đứng sau hệ connector, giống một cổng chung cho AI kết nối công cụ."
      ],
      blocks: [
        {
          title: "Hai loại connector",
          pairs: [
            {
              label: "Web connectors",
              text: "Kết nối tới dịch vụ đám mây như Google Drive, Notion, Slack, Asana, Linear hay Stripe."
            },
            {
              label: "Desktop extensions",
              text: "Chạy cục bộ qua Claude Desktop app, cho phép truy cập file local hoặc ứng dụng native."
            }
          ]
        },
        {
          title: "Tìm và kết nối công cụ",
          bullets: [
            "Anthropic có thư mục connector tại claude.ai/directory.",
            "Bạn cũng có thể bấm Search and tools ở góc dưới trái khung chat rồi chọn Add connectors.",
            "Tab Web dành cho dịch vụ cloud; tab Desktop extensions dành cho công cụ local chạy qua desktop app."
          ]
        },
        {
          title: "Cách cài một web connector",
          bullets: [
            "Tìm connector bạn muốn dùng trong directory hoặc trong Add connectors.",
            "Bấm Connect.",
            "Đăng nhập bằng tài khoản của dịch vụ đó.",
            "Xem kỹ các quyền được yêu cầu rồi authorize.",
            "Quay lại Claude và thử một câu lệnh đơn giản để xác nhận kết nối hoạt động."
          ]
        },
        {
          title: "Desktop extensions",
          bullets: [
            "Cần cài Claude Desktop app.",
            "Vào Settings > Extensions trong app desktop.",
            "Duyệt danh sách extension và bấm Install.",
            "Làm thêm các bước setup đặc thù mà extension yêu cầu."
          ]
        },
        {
          title: "Ví dụ dùng connector trong công việc",
          bullets: [
            "Quản lý dự án: hỏi các task ưu tiên cao trong tuần, tạo task mới, tóm tắt trạng thái product launch.",
            "Giao tiếp: tìm email thread về hợp đồng vendor, draft phản hồi cho kênh marketing hoặc tóm tắt quyết định trong thảo luận hôm qua.",
            "Tài liệu: tìm brand voice guideline trong Notion hoặc Drive, tóm tắt meeting notes, tra style guide.",
            "Business tools: xem xu hướng doanh thu quý gần nhất, kiểm tra trạng thái một cơ hội bán hàng hoặc liệt kê giao dịch lớn."
          ]
        },
        {
          title: "Bảo mật và quyền truy cập",
          bullets: [
            "Mỗi connector chỉ xin quyền cần thiết cho chức năng của nó và nhiều nơi cho phép bật tắt quyền riêng lẻ.",
            "Claude chỉ thấy dữ liệu mà chính bạn đang có quyền truy cập, không vượt quá quyền gốc của tài khoản bạn.",
            "Bạn có thể ngắt kết nối bất kỳ lúc nào trong Settings của Claude hoặc trong phần security của dịch vụ bên thứ ba."
          ]
        }
      ],
      reflection: [
        "Công cụ nào trong công việc hằng ngày của bạn đáng kết nối nhất với Claude?",
        "Những tác vụ copy-paste nào có thể biến mất nếu connectors làm thay bạn?"
      ],
      next: "Bài tiếp theo là Enterprise Search, phiên bản tìm kiếm theo ngữ cảnh doanh nghiệp dành cho Team và Enterprise."
    },
    {
      id: "enterprise-search",
      number: "Bài 09",
      moduleId: "expand-reach",
      module: "Mở rộng phạm vi của Claude",
      title: "Enterprise Search",
      time: "15 phút",
      objectives: [
        "Giải thích Enterprise Search là gì và loại câu hỏi nào nó phù hợp.",
        "Hiểu quy trình setup cho admin và user.",
        "Nắm cách quyền truy cập và bảo mật bảo vệ dữ liệu tổ chức."
      ],
      highlights: [
        "Enterprise Search thêm một không gian 'Ask {Your Org Name}' riêng để truy vấn tri thức nội bộ.",
        "Tính năng này tối ưu cho việc gom và tổng hợp thông tin từ nhiều nguồn trong công ty.",
        "Claude luôn tôn trọng quyền truy cập sẵn có của bạn và trích nguồn để dễ kiểm chứng."
      ],
      blocks: [
        {
          title: "Enterprise Search là gì?",
          paragraphs: [
            "Khác với chat thông thường có connector, Enterprise Search là trải nghiệm chuyên biệt cho bài toán tìm hiểu tri thức tổ chức. Nó dùng prompt và instruction được tùy chỉnh để việc tìm kiếm, tổng hợp, onboarding và tra cứu nội bộ hiệu quả hơn."
          ]
        },
        {
          title: "Những câu hỏi phù hợp",
          bullets: [
            "Tóm tắt điều gì đã xảy ra hôm qua khi tôi vắng mặt.",
            "Cập nhật các blocker hiện tại của một project nội bộ.",
            "Tra chính sách làm việc từ xa, quy trình xin nghỉ hoặc gửi expense report.",
            "Tìm lý do khách hàng hay chọn đối thủ, hoặc các thảo luận quanh roadmap Q4.",
            "Hỗ trợ onboarding như hỏi hệ thống authentication chạy ra sao hoặc team kỹ thuật deploy bằng công cụ nào."
          ]
        },
        {
          title: "Cách setup cho admin",
          bullets: [
            "Owner mở mục Ask Your Org trong sidebar và chọn Set up for your org.",
            "Kết nối tối thiểu một nguồn tài liệu như Google Drive hoặc SharePoint và một nguồn chat như Slack hoặc Microsoft Teams.",
            "Email là nguồn khuyến nghị nhưng không bắt buộc.",
            "Đặt tên project để mọi người thấy dưới dạng 'Ask [Tên]' ở sidebar, thêm mô tả rồi hoàn tất setup."
          ]
        },
        {
          title: "Cách bắt đầu cho user",
          bullets: [
            "Sau khi admin cấu hình xong, user sẽ thấy project Ask {Org Name} được ghim trong sidebar.",
            "Mở project, đi qua luồng onboarding hướng dẫn và xác thực từng dịch vụ muốn tra cứu.",
            "Càng bật nhiều connector liên quan thì kết quả tổng hợp càng đầy đủ."
          ]
        },
        {
          title: "An toàn dữ liệu",
          paragraphs: [
            "Enterprise Search chỉ hiển thị những gì bạn vốn đã có quyền thấy trong công cụ gốc. Cuộc trò chuyện của bạn vẫn private và dữ liệu đã kết nối không bị index hay lưu riêng thành một bản khác bên ngoài nguồn."
          ]
        }
      ],
      reflection: [
        "Những câu hỏi bạn thường phải hỏi đồng nghiệp có thể được Enterprise Search trả lời thay không?",
        "Nguồn dữ liệu nào trong tổ chức quan trọng nhất với vai trò của bạn?"
      ],
      next: "Bài tiếp theo là Research mode, nơi Claude thực hiện điều tra nhiều bước và tổng hợp báo cáo có trích dẫn."
    },
    {
      id: "research-mode",
      number: "Bài 10",
      moduleId: "expand-reach",
      module: "Mở rộng phạm vi của Claude",
      title: "Research mode cho các bài toán đào sâu",
      time: "15 phút",
      objectives: [
        "Giải thích Research là gì: điều tra có hệ thống, đa nguồn.",
        "Nhận biết khi nào nên dùng Research thay vì web search thường.",
        "Hiểu cách Research kết hợp với extended thinking để tạo báo cáo kỹ lưỡng.",
        "Viết prompt Research hiệu quả cho bài toán phức tạp."
      ],
      highlights: [
        "Research không chỉ chạy một lần tìm kiếm mà thực hiện nhiều vòng tra cứu nối tiếp nhau.",
        "Phần lớn báo cáo hoàn tất trong 5 đến 15 phút, nhưng có thể lên đến 45 phút cho bài toán nặng.",
        "Research tự bật extended thinking để lập kế hoạch tiếp cận và tách bài toán.",
        "Các kết luận đều có citation để bạn kiểm chứng."
      ],
      blocks: [
        {
          title: "Research là gì?",
          paragraphs: [
            "Khi bật Research, Claude chuyển từ vai trò đối thoại sang nhà điều tra có hệ thống. Claude sẽ khám phá câu hỏi từ nhiều góc độ, tổng hợp dữ liệu từ web và từ các integration đã kết nối để tạo ra một bản báo cáo rõ ràng và có nguồn."
          ]
        },
        {
          title: "Khi nào nên dùng Research",
          bullets: [
            "Khi cần báo cáo tổng hợp từ nhiều nguồn chứ không phải một fact đơn lẻ.",
            "Khi cần phân tích sâu trên web hoặc trên các integration như Google Workspace.",
            "Khi công việc bình thường sẽ mất hàng giờ tìm kiếm thủ công.",
            "Khi bạn cần so sánh đối thủ, vendor hoặc nhiều lựa chọn phức tạp.",
            "Khi bạn muốn mọi kết luận đều kèm citation."
          ]
        },
        {
          title: "Khi nào nên dùng tính năng khác",
          pairs: [
            {
              label: "Dùng web search thường",
              text: "Khi bạn chỉ cần dữ kiện nhanh, cụ thể như giá cổ phiếu hôm nay hoặc địa chỉ công ty."
            },
            {
              label: "Dùng extended thinking",
              text: "Khi bài toán cần suy luận sâu nhưng không cần lấy thêm thông tin bên ngoài, ví dụ toán, logic hay debug code."
            }
          ]
        },
        {
          title: "Research hoạt động ra sao",
          bullets: [
            "Bước 1: Claude lập kế hoạch điều tra và xác định những gì cần tìm.",
            "Bước 2: Claude chạy nhiều lần tra cứu nối tiếp, quyết định bước tiếp theo dựa trên kết quả vừa có.",
            "Bước 3: Claude tổng hợp phát hiện thành báo cáo có cấu trúc từ web và các integration liên quan.",
            "Bước 4: Claude gắn citation cho từng luận điểm để bạn kiểm tra lại nguồn dễ dàng."
          ]
        },
        {
          title: "Cách bật và dùng Research",
          bullets: [
            "Tìm nút Research ở góc dưới trái giao diện chat.",
            "Bấm để bật; khi đang bật, nút sẽ đổi sang màu xanh.",
            "Nhập prompt và chờ Claude làm việc ở background, bạn sẽ thấy các chỉ báo tiến trình.",
            "Lưu ý: web search phải được bật trước thì Research mới chạy."
          ]
        },
        {
          title: "Mẹo viết prompt Research",
          bullets: [
            "Nói rõ mục tiêu. Ví dụ thay vì 'Hãy nói về thị trường EV', hãy chỉ rõ cần phân tích thị trường pin xe điện, đối thủ, xu hướng công nghệ và rủi ro chuỗi cung ứng.",
            "Đưa cấu trúc mong muốn của báo cáo để Claude sắp xếp kết quả theo đúng khung bạn cần.",
            "Thêm ràng buộc như ngân sách, khung thời gian, địa lý hoặc mức độ ưu tiên.",
            "Nếu chưa biết đặt câu hỏi thế nào, bạn có thể nhờ Claude giúp viết lại prompt Research trước khi bật tính năng."
          ]
        },
        {
          title: "Kết hợp với integration đã kết nối",
          bullets: [
            "Tóm tắt những gì đã thảo luận về một project qua email và Slack rồi đối chiếu với best practices trên thị trường.",
            "Xem lịch họp tuần tới rồi nghiên cứu từng công ty bạn sắp gặp.",
            "Tìm tài liệu nội bộ về pricing strategy rồi so với cách định vị của đối thủ."
          ]
        }
      ],
      reflection: [
        "Trong công việc của bạn, bài nghiên cứu nào thường phải gom thông tin từ nhiều nguồn và đáng đưa vào Research nhất?"
      ],
      next: "Bài tiếp theo ghép toàn bộ kỹ năng đã học vào những use case thực tế theo vai trò công việc."
    }
    ,
    {
      id: "use-cases-by-role",
      number: "Bài 11",
      moduleId: "put-it-together",
      module: "Ghép mọi thứ lại",
      title: "Claude trong thực tế: use case theo vai trò",
      time: "10 phút",
      objectives: [
        "Nêu được 2 đến 3 use case của claude.ai có thể thử ngay.",
        "Biết tìm thêm cảm hứng use case ở đâu."
      ],
      highlights: [
        "Claude có thể hỗ trợ gần như mọi nhóm nghề nghiệp.",
        "Mỗi use case trong bài học gốc đều dẫn sang một guide chi tiết trong Use Case Gallery."
      ],
      blocks: [
        {
          title: "Use case chung cho dân văn phòng",
          bullets: [
            "Tạo project status report rõ ràng và nhất quán cho stakeholder.",
            "Phân tích pattern trong user feedback hoặc phản hồi khảo sát.",
            "Đóng gói brand guideline thành một skill để tái dùng."
          ]
        },
        {
          title: "Sales",
          bullets: [
            "Xây battle card library để hỗ trợ đội ngũ chốt deal.",
            "Chuẩn bị cho sales meeting bằng cách nghiên cứu prospect và gom talking point.",
            "Tạo sales report dễ đọc từ dữ liệu pipeline."
          ]
        },
        {
          title: "Marketing",
          bullets: [
            "Phân tích hiệu quả chiến dịch từ số liệu performance.",
            "Tái sử dụng và chuyển thể content cho nhiều kênh, nhiều nhóm khán giả."
          ]
        },
        {
          title: "Finance",
          bullets: [
            "Xây và tinh chỉnh financial model.",
            "Soạn investment memo nhanh và có cấu trúc hơn.",
            "Hiểu rồi mở rộng một spreadsheet được bàn giao lại."
          ]
        },
        {
          title: "HR, Legal, Research",
          bullets: [
            "HR: tạo onboarding guide cho nhân sự mới theo từng vị trí.",
            "Legal: theo dõi discovery timeline và phân tích mẫu lặp trong tài liệu pháp lý.",
            "Research: lên kế hoạch literature review và xác minh thống kê từ raw data."
          ]
        },
        {
          title: "Đi tiếp từ đây",
          paragraphs: [
            "Bài học gốc khuyến khích bạn mở Use Case Gallery để xem toàn bộ bộ sưu tập workflow mẫu, prompt gợi ý và hướng dẫn từng bước."
          ]
        }
      ],
      reflection: [
        "Hãy chọn một use case gần nhất với công việc của bạn và thử ngay sau khi đọc xong trang này."
      ],
      next: "Bài tiếp theo giới thiệu các cách làm việc khác với Claude ngoài claude.ai."
    },
    {
      id: "other-ways",
      number: "Bài 12",
      moduleId: "put-it-together",
      module: "Ghép mọi thứ lại",
      title: "Những cách khác để làm việc với Claude",
      time: "10 phút",
      objectives: [
        "Hiểu khi nào nên dùng Claude Code, Claude for Slack, Claude for Excel và Claude for Chrome."
      ],
      highlights: [
        "Claude.ai chỉ là một giao diện. Claude còn xuất hiện trong nhiều sản phẩm chuyên biệt theo ngữ cảnh công việc.",
        "Mỗi công cụ phù hợp với một môi trường làm việc khác nhau: terminal, Slack, Excel hoặc trình duyệt."
      ],
      blocks: [
        {
          title: "Claude Code",
          bullets: [
            "Dùng khi bạn muốn mô tả feature bằng tiếng tự nhiên và để Claude viết code, chạy test, tạo commit.",
            "Hữu ích khi debug bằng cách dán lỗi và nhờ Claude đọc codebase để tìm nguyên nhân.",
            "Tốt cho việc hỏi về codebase lạ, mối quan hệ giữa các phần và luồng hoạt động.",
            "Phù hợp để tự động hóa việc lặp như sửa lint, xử lý merge conflict hoặc viết release notes.",
            "Đặc biệt hợp với người muốn làm việc ngay trong terminal cùng IDE sẵn có."
          ]
        },
        {
          title: "Claude trong Slack",
          bullets: [
            "Soạn phản hồi, tóm tắt thread dài hoặc bóc tách cuộc thảo luận phức tạp mà không rời Slack.",
            "Chuẩn bị cho meeting bằng cách kéo những trao đổi và tài liệu liên quan trong workspace.",
            "Hỗ trợ onboarding bằng cách đọc lại lịch sử channel để hiểu project đang chạy.",
            "Có thể tag @Claude từ bug report hoặc thảo luận feature để mở Claude Code session với đúng ngữ cảnh.",
            "Tốt cho việc trả lời nhanh các câu hỏi về xu hướng ngành, khái niệm kỹ thuật hoặc thông tin công ty."
          ]
        },
        {
          title: "Claude for Excel",
          bullets: [
            "Dùng để hiểu workbook nhiều sheet, lần theo flow công thức và các phụ thuộc giữa sheet.",
            "Cập nhật assumption hoặc input mà vẫn giữ nguyên quan hệ công thức.",
            "Debug lỗi như #REF!, #VALUE! hoặc circular reference.",
            "Tạo spreadsheet mới hoặc đổ dữ liệu vào template có sẵn mà vẫn giữ cấu trúc công thức.",
            "Nhanh chóng dựng pivot table hoặc chart để nhìn dữ liệu rõ hơn."
          ]
        },
        {
          title: "Claude for Chrome",
          bullets: [
            "Tóm tắt bài viết, paper hoặc trang web ngay khi bạn đang duyệt.",
            "Hỗ trợ soạn email và quản lý inbox.",
            "Tự động hóa việc điền form lặp lại.",
            "Hỗ trợ test website hoặc đi qua các workflow nhiều bước trên web.",
            "Giữ ngữ cảnh khi bạn di chuyển giữa nhiều tab và nhiều tác vụ."
          ]
        },
        {
          title: "Lưu ý về Claude for Chrome",
          paragraphs: [
            "Bản gốc ghi rõ đây là research preview và phù hợp hơn với tác vụ ít rủi ro trên website đáng tin cậy. Extension sẽ xin phép trước với các hành động rủi ro cao như mua hàng hoặc chia sẻ dữ liệu cá nhân. Một số loại website bị chặn mặc định. Tại thời điểm bài học gốc, Claude for Chrome dành cho Claude Max subscribers và có waitlist ở claude.ai/chrome."
          ]
        },
        {
          title: "Tóm tắt nhanh các công cụ",
          pairs: [
            {
              label: "Claude.ai",
              text: "Tốt cho viết, nghiên cứu, phân tích, file creation và các tác vụ tổng quát trên web, desktop, mobile."
            },
            {
              label: "Claude Code",
              text: "Tốt cho phát triển phần mềm, điều hướng codebase và workflow git trong terminal, IDE hoặc browser."
            },
            {
              label: "Claude / Claude Code trong Slack",
              text: "Tốt cho cộng tác nhóm, prep meeting và hỏi đáp ngay trong ngữ cảnh công việc."
            },
            {
              label: "Claude for Excel",
              text: "Tốt cho phân tích spreadsheet, modeling tài chính và debug công thức."
            },
            {
              label: "Claude for Chrome",
              text: "Tốt cho nghiên cứu web, xử lý email và tự động hóa thao tác trình duyệt."
            }
          ]
        }
      ],
      reflection: [
        "Môi trường làm việc nào của bạn nên có Claude xuất hiện trực tiếp: terminal, Slack, Excel hay trình duyệt?"
      ],
      next: "Bài cuối cùng sẽ tổng kết toàn bộ khóa học và gợi ý các tài nguyên nên học tiếp."
    },
    {
      id: "whats-next",
      number: "Bài 13",
      moduleId: "put-it-together",
      module: "Ghép mọi thứ lại",
      title: "Tiếp theo là gì?",
      time: "5 phút",
      objectives: [
        "Tổng kết lại những gì bạn đã học và xác định bước tiếp theo sau khóa Claude 101."
      ],
      highlights: [
        "Bạn đã đi qua nền tảng sử dụng Claude, tổ chức ngữ cảnh, mở rộng công cụ và ứng dụng theo vai trò.",
        "Bản gốc khuyến khích hoàn tất phần recap và quiz để lấy certificate trên nền tảng chính thức."
      ],
      blocks: [
        {
          title: "Tổng kết phần 1: Bắt đầu với Claude",
          bullets: [
            "Claude là trợ lý AI được thiết kế để hữu ích, vô hại và trung thực; mục tiêu là trở thành đối tác tư duy cho công việc phức tạp.",
            "Bạn có thể truy cập Claude qua web, desktop và mobile với dữ liệu đồng bộ giữa thiết bị.",
            "Prompt hiệu quả thường đặt bối cảnh, xác định nhiệm vụ và chỉ ra quy tắc đầu ra."
          ]
        },
        {
          title: "Tổng kết phần 2: Nhận kết quả tốt hơn",
          bullets: [
            "Cần coi phản hồi đầu tiên là điểm khởi đầu rồi lặp dần qua hội thoại.",
            "Các lỗi phổ biến như generic response, sai tone hay sai format thường xử lý được bằng ngữ cảnh cụ thể hơn.",
            "AI Fluency gồm bốn năng lực: Delegation, Description, Discernment và Diligence."
          ]
        },
        {
          title: "Tổng kết phần 3: Tổ chức công việc",
          bullets: [
            "Projects tạo workspace riêng với knowledge base, instruction bền vững và cộng tác nhóm.",
            "Artifacts là đầu ra độc lập như document, code, diagram hay tool tương tác.",
            "Skills cho Claude thêm năng lực quy trình, bao gồm built-in skill và skill tự tạo."
          ]
        },
        {
          title: "Tổng kết phần 4: Mở rộng phạm vi của Claude",
          bullets: [
            "Connectors đưa Claude tới Google Workspace, Slack, Notion và nhiều công cụ khác để làm việc với dữ liệu thật.",
            "Enterprise Search thêm trải nghiệm truy vấn tri thức nội bộ trong doanh nghiệp.",
            "Research mode cho phép điều tra đa nguồn, có hệ thống và có citation."
          ]
        },
        {
          title: "Tổng kết phần 5: Ghép mọi thứ lại",
          bullets: [
            "Claude có thể áp dụng cho sales, marketing, finance, HR, legal, research và nhiều vai trò khác.",
            "Ngoài claude.ai, bạn còn có thể dùng Claude qua Claude Code, Slack, Excel và Chrome."
          ]
        },
        {
          title: "Tài nguyên nên học tiếp",
          bullets: [
            "AI Fluency courses để học sâu hơn về cách cộng tác hiệu quả với AI.",
            "Use Case Gallery để xem workflow mạnh, prompt mẫu và hướng dẫn từng bước.",
            "Anthropic Help Center để tra cứu tài liệu chi tiết và troubleshooting.",
            "Prompting documentation để học cách viết yêu cầu hiệu quả hơn.",
            "Claude Code in Action để đi sâu vào workflow cho developer.",
            "Connector Directory để tìm và kết nối các công cụ phù hợp."
          ]
        },
        {
          title: "Lời khích lệ cuối khóa",
          paragraphs: [
            "Điều quan trọng nhất sau khóa học là bắt đầu thật sự. Hãy chọn một tác vụ lặp lại trong tuần này và thử làm cùng Claude: soạn email, tóm tắt note họp, phân tích spreadsheet hoặc chuẩn bị tài liệu. Cứ làm, chỉnh, quan sát điều gì hiệu quả với ngữ cảnh riêng của bạn.",
            "Claude nên được dùng như cộng sự chứ không phải thay thế hoàn toàn con người. Kết quả tốt nhất đến khi bạn mang vào cuộc trò chuyện chuyên môn, ngữ cảnh và khả năng phán đoán của chính mình."
          ]
        }
      ],
      reflection: [
        "Ngay tuần này, bạn sẽ thử Claude vào tác vụ lặp lại nào đầu tiên?",
        "Nếu muốn nhận certificate, bạn cần quay lại nền tảng gốc để làm quiz hoàn tất khóa."
      ],
      next: "Bạn đã đi hết bản Việt hóa của Claude 101. Bước tiếp theo hợp lý nhất là áp dụng ngay vào một công việc thật của bạn."
    }
  ]
};
