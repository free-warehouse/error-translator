window.ERROR_RULES = [
  { lang: "Java", name: "NullPointerException", test: /NullPointerException/, title: "空指针",
    meaning: "程序用到了一个空对象。空对象上面没有方法，也没有字段，所以一调用就停了。",
    look: "看报错里 .java 后面的行号。那一行上被点出来的变量，当时是 null。它可能还没 new，也可能是某个方法返回了 null。先判断，再使用。",
    points: [
      { term: "null", text: "表示这里没有对象。它和空字符串、数字 0 不是一回事，不能对它点出方法。" },
      { term: "点号", text: "写出 a.b() 时，a 必须已经是一个对象。a 还没 new，或某个方法返回了 null，都会在这个点号上停下。" }
    ] },
  { lang: "Java", name: "ArrayIndexOutOfBoundsException", test: /ArrayIndexOutOfBoundsException/, title: "数组下标越界", rank: 2,
    meaning: "数组没有你写的那个位置。下标从 0 开始，最后一个是长度减 1。",
    look: "看报错里的数字，那就是你用的下标。再对照数组的 length。不要用 length 本身当下标。",
    points: [
      { term: "下标从 0 开始", text: "长度为 3 的数组，合法下标只有 0、1、2。写 3 就会越界。" },
      { term: "length", text: "length 是元素个数，不是最后一个下标。最后一个要写 length - 1。" }
    ] },
  { lang: "Java", name: "StringIndexOutOfBoundsException", test: /StringIndexOutOfBoundsException/, title: "字符串下标越界", rank: 2,
    meaning: "你在字符串里取的位置，超出了它的长度。空字符串不能取第 0 个字符。",
    look: "看 charAt 或 substring 的参数。结束位置不能比字符串长度还大。",
    points: [
      { term: "charAt", text: "按下标取一个字符。空字符串没有第 0 个字符。" },
      { term: "substring", text: "开始和结束位置都从 0 数，结束位置可以等于长度，不能比长度更大。" }
    ] },
  { lang: "Java", name: "IndexOutOfBoundsException", test: /IndexOutOfBoundsException/, title: "列表下标越界",
    meaning: "列表里没有你要的那一号。空列表调用 get(0) 就会这样。",
    look: "先看列表是不是空的，再取元素。get 的数字必须小于 size()。",
    points: [
      { term: "get 和 size", text: "合法下标是 0 到 size() - 1。get(size()) 一定越界。" },
      { term: "空列表", text: "一个元素都没有时，任何 get 都会失败。取之前先看 size() 是不是 0。" }
    ] },
  { lang: "Java", name: "NegativeArraySizeException", test: /NegativeArraySizeException/, title: "数组长度写成了负数",
    meaning: "new 数组时，长度不能小于 0。",
    look: "看 new 后面括号里的数字从哪来。循环次数、用户输入算出来是负数时，先拦住再 new。",
    points: [
      { term: "数组长度", text: "new int[n] 里的 n 必须大于等于 0。长度在创建时就定了。" },
      { term: "先算再创建", text: "如果 n 来自变量，先确认它不是负数，再拿去创建数组。" }
    ] },
  { lang: "Java", name: "NumberFormatException", test: /NumberFormatException/, title: "文字变不成数字",
    meaning: "parseInt 或 parseDouble 收到的文字，不是一个合法数字。",
    look: "看引号里的内容。空字符串、空格、字母、多余的小数点，都会失败。先 trim，再确认它全是数字。",
    points: [
      { term: "parseInt", text: "只接受像 42 这样的整数字符串。3.14、空串、带字母的文字都会失败。" },
      { term: "trim", text: "用户输入两边常常有空格。转换前先 trim，再看剩下的是不是数字。" }
    ] },
  { lang: "Java", name: "ArithmeticException", test: /ArithmeticException/, title: "除数是 0",
    meaning: "整数除法或取余的除数是 0。",
    look: "看除法那一行。除之前判断除数。整数相除不会得到小数，需要小数时用 double。",
    points: [
      { term: "除数", text: "整数相除，右边是 0 时 Java 会停下来。先判断除数，再除。" },
      { term: "整数除法", text: "两个 int 相除会丢掉小数。5 / 2 得到 2。需要小数时，至少一边要是 double。" }
    ] },
  { lang: "Java", name: "ClassCastException", test: /ClassCastException/, title: "强制转换失败",
    meaning: "这个对象的真实类型，不是你强转的那个类。",
    look: "看 cannot be cast to 两边的类名。先用 instanceof 判断，再转换。",
    points: [
      { term: "真实类型", text: "变量声明的类型，和里面实际装的对象，可以不一样。强转看的是实际装的那个。" },
      { term: "instanceof", text: "转换前先问对象是不是那个类。不是就不要转。" }
    ] },
  { lang: "Java", name: "FileNotFoundException", test: /FileNotFoundException/, title: "找不到文件",
    meaning: "给出的路径上没有这个文件，或者程序没有权限读它。",
    look: "看报错里的路径。相对路径从你运行程序的文件夹算起，不一定是源码所在的文件夹。",
    points: [
      { term: "相对路径", text: "不写盘符时，起点是你运行 java 的那个文件夹，不是 .java 文件旁边。" },
      { term: "先确认文件在", text: "把报错里的完整路径和资源管理器里的位置对一下。名字差一个字母也算找不到。" }
    ] },
  { lang: "Java", name: "cannot find symbol", test: /cannot find symbol/, title: "找不到这个名字",
    meaning: "编译器不认识这个变量、方法或类。常见是拼写不一致，或者还没声明。",
    look: "看 symbol 后面的名字。和声明对照，包括大小写。方法还要看参数类型是否一致。",
    points: [
      { term: "先声明再使用", text: "变量、方法、类都要先有定义，编译器才认识这个名字。" },
      { term: "大小写", text: "Java 区分大小写。name 和 Name 是两个名字。" }
    ] },
  { lang: "Java", name: "';' expected", test: /';' expected/, title: "这里少了分号",
    meaning: "Java 语句要用分号结束，这一处没有。",
    look: "先看指出的那一行，再看上一行的末尾。漏掉的分号经常在上一句。",
    points: [
      { term: "语句结束", text: "一句完整的 Java 语句通常以分号结束。if、for、方法声明后面是大括号，本身不加分号。" },
      { term: "看上一行", text: "编译器标出的行，常常是它发现不对的地方。漏掉的分号多半在上一句末尾。" }
    ] },
  { lang: "Java", name: "'}' expected", test: /'[[\](){}]' expected/, title: "少了括号",
    meaning: "小括号、中括号或大括号没有成对。编译器在这里还等着其中的一个。",
    look: "看 expected 前面是哪一个括号。从报错行往上配对。少掉的常常不是最后一行，而是更早打开、一直没关上的那一个。",
    points: [
      { term: "成对", text: "每个 ( 都要有 )，每个 [ 都要有 ]，每个 { 都要有 }。字符串里的括号不算。" },
      { term: "从里往外", text: "先关上最里面的一对，再关上外面的。编辑器里点一下括号，通常能跳到它的另一半。" }
    ] },
  { lang: "Java", name: "possible lossy conversion", test: /possible lossy conversion/, title: "数字精度会丢", rank: 2,
    meaning: "你把一个范围更大的数，塞进一个装不下的类型。例如 double 赋给 int，小数会被丢掉。",
    look: "看 from 和 to 两边的类型。确实要丢掉小数时，显式转换，并确认这是你想要的。",
    points: [
      { term: "整型和小数", text: "int 只存整数。double 可以有小数。把 double 放进 int，小数部分留不住。" },
      { term: "显式转换", text: "你确定要丢掉小数时，写成 (int) 那个数。编译器才会让它过去。" }
    ] },
  { lang: "Java", name: "incompatible types", test: /incompatible types/, title: "两边类型不一样",
    meaning: "要赋值或返回的类型，和实际给的类型对不上。",
    look: "看 required 和 found。把右边改成左边要的类型，或者把左边的声明改成右边的类型。",
    points: [
      { term: "声明类型", text: "左边写的类型，决定这个变量能装什么。右边给的值必须能放进去。" },
      { term: "返回值", text: "方法写了返回 String，就不能 return 一个 int。每条 return 都要符合声明。" }
    ] },
  { lang: "Java", name: "missing return statement", test: /missing return statement/, title: "有一条路没有返回值",
    meaning: "方法声明了要返回数据，但不是每条分支都写了 return。",
    look: "把每个 if、else 走到最后。缺 return 的就是报错的那条路。",
    points: [
      { term: "返回类型", text: "方法不是 void 时，每一种走法都必须 return 一个值。" },
      { term: "分支", text: "if 里面 return 了，else 也要 return。漏掉的通常是没写 else 的那条路。" }
    ] },
  { lang: "Java", name: "might not have been initialized", test: /might not have been initialized/, title: "变量可能还没有值",
    meaning: "局部变量在使用前，编译器不能保证它已经被赋值。",
    look: "在声明时给一个初值，或保证用到它之前每条路都赋值过。",
    points: [
      { term: "局部变量", text: "写在方法里面的变量，Java 不会自动给 0 或 null。用之前必须赋过值。" },
      { term: "每条路都要赋值", text: "如果赋值写在 if 里面，编译器会考虑 if 不成立的那条路。那条路也要有值。" }
    ] },
  { lang: "Java", name: "package demo does not exist", test: /package [^ ]+ does not exist/, title: "这个包不存在",
    meaning: "import 写的包，编译时找不到。",
    look: "先看包名是否拼错。若是第三方库，确认它已经加进当前项目，而不是只装在别的地方。",
    points: [
      { term: "import", text: "import 是在告诉编译器去哪个包里找类。包名写错，类就找不到。" },
      { term: "包名", text: "包名要和文件夹、类真实所在的位置一致，大小写也要一致。" }
    ] },
  { lang: "Java", name: "UnsupportedClassVersionError", test: /UnsupportedClassVersionError/, title: "Java 版本对不上",
    meaning: "class 文件是用更新的 Java 编译的，你用来运行的 Java 更旧。",
    look: "让编译和运行使用同一套 JDK。看 class file version，数字越大，需要的 Java 越新。",
    points: [
      { term: "编译和运行", text: "javac 和 java 最好来自同一套 JDK。用新版本编译、旧版本运行，就会这样。" },
      { term: "class 文件", text: "源码编译后才是 class。运行的是 class，不是你眼前的 .java 文本。" }
    ] },
  { lang: "Java", name: "StackOverflowError", test: /StackOverflowError/, title: "递归没有出口",
    meaning: "方法一直调用自己，或者两个方法互相调用，停不下来。",
    look: "看堆栈里重复出现的方法名。给递归一个不再调用自己的条件。",
    points: [
      { term: "递归", text: "方法调用自己时，必须有一种情况直接返回，不再继续调用。" },
      { term: "出口", text: "每次调用都要离出口更近一步。条件写了但数据没有变小，还是会停不下来。" }
    ] },
  { lang: "Java", name: "unreported exception", test: /unreported exception/, title: "异常没有处理",
    meaning: "这个方法可能抛出受检异常。你要么抓住它，要么在方法上声明抛出。",
    look: "看异常的名字。在调用外面加 try-catch，或在方法签名加上 throws。",
    points: [
      { term: "受检异常", text: "有些异常编译器要求你表态，例如读写文件失败。不能装成不会发生。" },
      { term: "两种处理", text: "就地 try-catch，或者在方法后面写 throws，把这件事交给调用者。" }
    ] },
  { lang: "Java", name: "reached end of file while parsing", test: /reached end of file while parsing/, title: "文件结束了，括号还没配平",
    meaning: "大括号、小括号或引号少了一边，编译器读到文件末尾还在等。",
    look: "从报错附近往上对括号。多出来或少掉的那一个，通常不在最后一行，而在更早的某一块。",
    points: [
      { term: "文件末尾", text: "编译器走到最后还在等右括号或引号，说明更前面有一个没关上。" },
      { term: "一块一块对", text: "从最外层的类括号看起，再看方法，再看 if。哪一层对不上，问题就在那一层。" }
    ] },
  { lang: "Java", name: "NoSuchElementException", test: /NoSuchElementException/, title: "没有下一个元素了",
    meaning: "迭代器或 Scanner 已经没有内容，你还在要下一个。",
    look: "next 之前先用 hasNext 判断。Scanner 读空输入也会这样。",
    points: [
      { term: "hasNext", text: "先问还有没有下一个，再取。没有还取，就会停。" },
      { term: "Scanner", text: "输入已经读完，或用户直接结束了输入，再 next 就会失败。" }
    ] },
  { lang: "Java", name: "InputMismatchException", test: /InputMismatchException/, title: "输入的类型不对",
    meaning: "Scanner 想读数字，输入里却是别的文字。",
    look: "看你调用的是 nextInt 还是 nextDouble。输入要和它一致，或者先按字符串读入再转换。",
    points: [
      { term: "nextInt", text: "它只接受整数。输入字母或小数，这次读取就会失败。" },
      { term: "先读字符串", text: "拿不准用户会输入什么时，先 nextLine，再自己判断能不能变成数字。" }
    ] },
  { lang: "Java", name: "ConcurrentModificationException", test: /ConcurrentModificationException/, title: "遍历时改了集合",
    meaning: "用 for-each 遍历列表时，又在里面增删元素。",
    look: "不要在这种循环里直接 remove。用迭代器的 remove，或先把要删的记下来，循环结束后再删。",
    points: [
      { term: "遍历时不要改", text: "for-each 正在按原来的列表走。循环里面 add 或 remove，它就不知道下一格是谁。" },
      { term: "删完再继续", text: "先把要删的记到另一个列表，循环结束后再删。这样原来的遍历不会被打断。" }
    ] },
  { lang: "Java", name: "non-static method", test: /non-static method/, title: "静态方法里调用了普通方法",
    meaning: "main 是静态的，它没有自己的对象。普通方法必须先有对象才能调用。",
    look: "看报错里的方法名。在 main 里先 new 一个对象，再用对象去调用；或者把那个方法也改成 static。",
    points: [
      { term: "static", text: "静态方法属于类，不需要先 new。main 就是静态方法，程序从这里开始。" },
      { term: "先有对象", text: "没写 static 的方法属于对象。在 main 里要先 new，再用那个对象调用它。" }
    ] },
  { lang: "Java", name: "cannot be applied to given types", test: /cannot be applied to given types/, title: "参数对不上",
    meaning: "方法或构造器的名字在，但你传的参数个数或类型，对不上声明。",
    look: "看 required 和 found。把实参的个数、顺序、类型和括号里的形参逐个对齐。",
    points: [
      { term: "形参和实参", text: "声明里括号中的是形参。调用时传进去的是实参。个数和类型都要能对上。" },
      { term: "重载", text: "同名方法可以有好几份，靠参数区别。哪一份都对不上时，就是这次调用写错了。" }
    ] },
  { lang: "Java", name: "cannot be dereferenced", test: /cannot be dereferenced/, title: "基本类型不能点方法",
    meaning: "int、double 这种基本类型不是对象，不能用点号叫方法。",
    look: "看点号左边的变量。如果它是基本类型，用对应的包装类，或者换一种不需要点号的写法。",
    points: [
      { term: "基本类型", text: "int、double、boolean、char 直接存值，它们自己没有方法。" },
      { term: "包装类", text: "需要方法时用 Integer、Double 这类对象。不要对一个 int 变量点出方法。" }
    ] },
  { lang: "Java", name: "unclosed string literal", test: /unclosed string literal/, title: "字符串没有结束",
    meaning: "双引号只有开头，这一行里没有把它关上。",
    look: "看这一行的引号。结束要用英文双引号。中文引号、少一个引号、字符串中间直接换行，都会这样。",
    points: [
      { term: "字符串字面量", text: "双引号包起来的一段文字，必须在同一行里关上。Java 普通字符串不能中途换行。" },
      { term: "英文引号", text: "结束引号必须是英文的 \" 。从网页复制进来的中文引号，编译器不会把它当结束。" }
    ] },
  { lang: "Java", name: "illegal start of expression", test: /illegal start of expression|illegal start of type/, title: "这行的开头不合法",
    meaning: "编译器在这个位置不接受现在这个词。常见是括号、分号已经乱了，或者关键字用错了地方。",
    look: "先看这一行，再看上一行的末尾。上一句如果少了分号或括号，编译器往往会把错怪到这一行开头。",
    points: [
      { term: "表达式", text: "等号右边、方法参数这些位置，要放一个能算出值的式子，不能突然放一个类声明。" },
      { term: "错经常在上一句", text: "这一行开头被说不合法时，先检查上一句有没有写完。" }
    ] },
  { lang: "Java", name: "should be declared in a file named", test: /should be declared in a file named/, title: "public 类名和文件名不一致",
    meaning: "public 的类，必须放在同名的 .java 文件里。类名和文件名现在对不上。",
    look: "看 class 后面的名字，再看文件名。两边改成同一个，包括大小写。一个文件里只放一个 public 类。",
    points: [
      { term: "public 类", text: "公开的类，文件名必须和类名一样，例如 Hello 放在 Hello.java。" },
      { term: "大小写也算", text: "Hello 和 hello 在 Java 里是两个名字。文件名要和 class 后面的词完全一致。" }
    ] },
  { lang: "Java", name: "is already defined", test: /is already defined/, title: "这个名字已经定义过了",
    meaning: "同一个范围内，这个变量或方法已经有过一次了。",
    look: "搜索这个名字。留下一个声明。如果是想赋值，不要再写一遍类型。",
    points: [
      { term: "声明和赋值", text: "int n = 1; 是声明。后面再改值写 n = 2; 不要写成 int n = 2;。" },
      { term: "同一个范围", text: "同一个方法里不能有两个同名局部变量。参数和里面的变量也不要撞名。" }
    ] },
  { lang: "Java", name: "Could not find or load main class", test: /Could not find or load main class/, title: "运行时找不到主类",
    meaning: "java 命令要启动的类不存在，或类名和你写的不一致。",
    look: "看命令里的类名，不要带 .class 或 .java。在 class 文件所在的文件夹运行，包名也要一起写上。",
    points: [
      { term: "主类", text: "里面有 main 方法的那个类，才是 java 命令后面要写的名字。" },
      { term: "不要带后缀", text: "运行时写 java Hello，不写 java Hello.java，也不写 java Hello.class。" }
    ] },
  { lang: "Java", name: "ClassNotFoundException", test: /ClassNotFoundException/, title: "运行时找不到这个类",
    meaning: "程序按名字去加载一个类，当前的 classpath 里没有它。",
    look: "看报错里的类名是否拼错。第三方库要在运行时也能找到，不只是编译时能找到。",
    points: [
      { term: "classpath", text: "Java 运行时只在 classpath 里找类。编译能过，只说明当时找得到。" },
      { term: "类名字符串", text: "有些加载用的是文字里的类名。文字写错，和 import 写错是同一类问题。" }
    ] },
  { lang: "Java", name: "NoClassDefFoundError", test: /NoClassDefFoundError/, title: "编译时有这个类，运行时没有",
    meaning: "编译的时候找得到这个类，运行的时候找不到它的 class 文件。",
    look: "看缺的类名。确认对应的 jar 或 class 在运行命令里，而不只是在 IDE 的编译路径里。",
    points: [
      { term: "编译路径和运行路径", text: "IDE 里能编译，不代表命令行运行时还带着同样的库。" },
      { term: "class 还在不在", text: "类名没有拼错，但 class 文件或 jar 没有跟着程序一起走，也会这样。" }
    ] },
  { lang: "Java", name: "'void' type not allowed here", test: /'void' type not allowed here|void cannot be converted/, title: "void 方法不能当值用",
    meaning: "这个方法不返回数据，你却把它用在了需要一个值的地方。",
    look: "看那个方法的声明是不是 void。调用它就不能放进等号右边、return 或别的括号里当参数。",
    points: [
      { term: "void", text: "void 表示这个方法只做事，不交出一个值。它不能出现在等号右边。" },
      { term: "返回值", text: "如果调用的地方需要一个数或一个对象，方法就要声明真正的返回类型，并 return。" }
    ] },
  { lang: "Java", name: "bad operand types", test: /bad operand types/, title: "这个运算符两边的类型不对",
    meaning: "加号、比较符或其他运算符，不接受你放在两边的类型。",
    look: "看 operator 两边。字符串和数字不能直接比大小。需要同一种类型时，先转换再运算。",
    points: [
      { term: "运算符", text: "+、-、比较符都要求两边的类型它能处理。不是所有类型都能放在一起。" },
      { term: "先转换", text: "要比较或计算时，先把两边变成同一种合适的类型，再写运算符。" }
    ] },
  { lang: "Java", name: "array required, but", test: /array required, but/, title: "下标用在了不是数组的东西上",
    meaning: "你写了 []，但左边那个值不是数组。",
    look: "看 [] 左边的名字。列表要用 get，字符串要用 charAt，只有数组才能直接写 [下标]。",
    points: [
      { term: "数组才有下标", text: "int[] 可以用 [i]。ArrayList 要用 get(i)，不能写 [i]。" },
      { term: "先看类型", text: "报错会写出它实际找到的类型。按那个类型的取法去写，不要套数组的方括号。" }
    ] },
  { lang: "Java", name: "'else' without 'if'", test: /'else' without 'if'/, title: "else 没有配对的 if",
    meaning: "else 必须紧跟在一个 if 的后面。中间多了一句，或 if 被提前结束了。",
    look: "看 else 上面最近的 if。如果 if 只有一句，不要在那句后面多写一个分号把 if 结束掉。",
    points: [
      { term: "if 和 else", text: "else 属于它上面那个 if。中间不能插入另一句独立的语句。" },
      { term: "多余的分号", text: "if (条件); 这个分号会把 if 提前结束，下面的 else 就失去了 if。" }
    ] },
  { lang: "Java", name: "not a statement", test: /not a statement/, title: "这行不是一句完整的话",
    meaning: "编译器看到了一个值或一个名字，但这里需要一句能执行的语句。",
    look: "看这一行是不是只写了变量名或一个式子，却没有赋值、调用或分号该有的结构。",
    points: [
      { term: "语句", text: "方法里面放的是语句：赋值、调用、if、return。单独扔一个变量名不算做事。" },
      { term: "调用要有括号", text: "要用方法就写上括号。只写方法名，不会执行它。" }
    ] },
  { lang: "Java", name: "illegal character", test: /illegal character/, title: "这里有 Java 不接受的字符",
    meaning: "源文件里混进了中文标点、特殊空格，或从网页复制来的看不见的字符。",
    look: "看报错标出的那一格。把引号、分号、括号换成英文符号。实在看不出时，把那一行重新手打一遍。",
    points: [
      { term: "英文符号", text: "代码里的引号、逗号、分号、括号要用英文半角。中文标点看起来很像，编译器不认。" },
      { term: "看不见的字符", text: "从网页贴进来的代码，有时带着特殊空格。删掉那一行再手打，比在里面找更快。" }
    ] },

  { lang: "Python", name: "IndentationError", test: /IndentationError/, title: "缩进对不齐",
    meaning: "Python 用缩进表示代码块。这一行的空格数量和它所属的块不一致。",
    look: "看报错行和它上面一行。同一层必须一样齐。不要混用 Tab 和空格。",
    points: [
      { term: "缩进就是结构", text: "Python 不靠大括号分层。空格多一截，这行就属于上面那句的里面。" },
      { term: "同一层一样齐", text: "同一个 if 或函数里的语句，左边要对齐。习惯上每一层增加 4 个空格。" }
    ] },
  { lang: "Python", name: "TabError", test: /TabError/, title: "空格和 Tab 混在一起了",
    meaning: "同一块缩进里，有的行用空格，有的行用 Tab。Python 不接受。",
    look: "把这一块全部改成空格。编辑器里打开显示空白字符，能看见区别。",
    points: [
      { term: "Tab 和空格", text: "看起来一样齐，底层可以一个是 Tab、一个是空格。Python 把它们当成不同的缩进。" },
      { term: "统一用空格", text: "把这一块都换成空格。编辑器可以设置把 Tab 显示出来，方便你看见混用。" }
    ] },
  { lang: "Python", name: "EOL while scanning", test: /EOL while scanning/, title: "这一行的字符串没写完", rank: 2,
    meaning: "引号在这一行开了头，还没关上就换行了。",
    look: "看这一行的引号。用同一种英文引号把它关上。字符串中间不要直接回车。",
    points: [
      { term: "引号成对", text: "开始用了单引号，结束也要用单引号。双引号同理。中文引号不能用来结束。" },
      { term: "不要中途换行", text: "普通字符串要在同一行里关上。没写完就回车，解释器会停在这一行。" }
    ] },
  { lang: "Python", name: "unexpected EOF while parsing", test: /unexpected EOF while parsing/, title: "括号或引号没写完，文件就结束了", rank: 2,
    meaning: "解释器读到文件末尾，还在等右括号或引号。",
    look: "从最后一行往上对括号和引号。少掉的那一个，通常在更早的某一行，不在最后。",
    points: [
      { term: "EOF", text: "表示文件已经到头。解释器还在等后半边，说明前面有一个没配对。" },
      { term: "括号层次", text: "函数调用、列表、字典的括号都要关上。先关最里面的，再关外面的。" }
    ] },
  { lang: "Python", name: "SyntaxError", test: /SyntaxError/, title: "这行语法不完整", needLang: true,
    meaning: "解释器没法把这行读成一句 Python。常见是括号、引号、冒号少了一边。",
    look: "看报错标出的行，再看上一行。if、for、def、class 的下一行要缩进，行尾通常要有冒号。",
    points: [
      { term: "冒号", text: "if、for、while、def、class 的行尾要有冒号，下一行再缩进。" },
      { term: "看上一行", text: "标出来的位置，有时是下一行。漏掉的括号或冒号常常在它上面。" }
    ] },
  { lang: "Python", name: "NameError", test: /NameError/, title: "这个名字还不存在",
    meaning: "你使用的变量还没有赋值，或者和声明时的拼写不一致。",
    look: "看引号里的名字。往上搜索同名赋值。函数里的名字外面看不见，外面的名字函数里要用参数传进来。",
    points: [
      { term: "先赋值再使用", text: "Python 里没有单独的声明。名字第一次出现，通常就该是赋值。" },
      { term: "函数的内外", text: "函数里面新建的名字，函数外面看不见。外面的值要靠参数传进来。" }
    ] },
  { lang: "Python", name: "UnboundLocalError", test: /UnboundLocalError/, title: "局部变量用得太早",
    meaning: "函数里面给这个名字赋过值，所以它被当成局部变量。但第一次用到它时，赋值还没执行。",
    look: "在函数里找到这个名字。把赋值移到使用之前。如果想改外面的变量，要先声明 global 或 nonlocal。",
    points: [
      { term: "局部变量", text: "函数里只要给一个名字赋过值，这个名字在整个函数里都算局部的。" },
      { term: "global", text: "如果你是想改函数外面的那个变量，要在使用前写 global 名字。否则左边的赋值会把它变成局部的。" }
    ] },
  { lang: "Python", name: "unsupported operand", test: /unsupported operand/, title: "这两种类型不能这样运算", rank: 2,
    meaning: "加号或比较符不接受你放在两边的类型。常见是文字和数字直接相加。",
    look: "看报错里的两个类型。需要数字就先 int 或 float，需要拼文字就把数字变成 str。",
    points: [
      { term: "类型要配对", text: "int 和 str 不能直接相加。Python 不会自动把文字变成数字。" },
      { term: "先转换", text: "要计算就转换成数字，要拼接就转换成字符串。两边变成同一种再运算。" }
    ] },
  { lang: "Python", name: "positional argument", test: /positional argument/, title: "参数个数不对", rank: 2,
    meaning: "调用函数时，传进去的参数个数和定义不一致。",
    look: "看 takes 和 were given，或 missing 后面的数字。把定义里的参数和调用时的括号逐个对齐。",
    points: [
      { term: "形参", text: "def 后面括号里有几个名字，调用时通常就要传几个值。" },
      { term: "默认值", text: "有默认值的参数可以不传。没有默认值的，少传一个就会失败。" }
    ] },
  { lang: "Python", name: "object is not subscriptable", test: /object is not subscriptable/, title: "这个值不能用方括号取", rank: 2,
    meaning: "你对它写了 []，但它不是列表、字符串或字典。它常常是 None 或一个数字。",
    look: "看方括号左边。先把它打印出来。是 None 的话，回到产生它的那一行，看为什么没有得到容器。",
    points: [
      { term: "下标", text: "[] 用来取列表、字符串、字典里的一项。数字和 None 没有这种取法。" },
      { term: "None", text: "函数没有 return，结果就是 None。对 None 再写 [0]，就会是这种错。" }
    ] },
  { lang: "Python", name: "object is not iterable", test: /object is not iterable/, title: "这个值不能被遍历", rank: 2,
    meaning: "for 或别的遍历用在了一个不能逐项取出的值上。常见是 None 或一个数字。",
    look: "看 for 后面的那个值。列表、字符串可以被遍历。None 不行。先确认它到底是什么。",
    points: [
      { term: "可迭代", text: "for 要求右边能一项一项交出来。列表可以，普通数字不可以。" },
      { term: "None 不能遍历", text: "如果右边来自一个函数，先看那个函数有没有 return 一个列表。" }
    ] },
  { lang: "Python", name: "object is not callable", test: /object is not callable/, title: "这个值不是函数，不能加括号调用", rank: 2,
    meaning: "你在它后面写了括号，但它不是函数。可能和变量撞了名，或者多写了一对括号。",
    look: "看括号左边的名字。搜索它是不是被赋成了一个普通值。函数调用只能有它需要的那几层括号。",
    points: [
      { term: "调用", text: "名字后面加括号，表示执行。变量里如果装的是数字或列表，就不能再加括号。" },
      { term: "撞名", text: "不要用 list、str 这种名字装自己的数据，否则内置的那个功能会被盖住。" }
    ] },
  { lang: "Python", name: "TypeError", test: /TypeError/, title: "类型不能这样用", needLang: true,
    meaning: "运算或函数不接受现在这个类型。例如文字和数字直接相加，或者参数个数不对。",
    look: "看 not supported between 或 takes 后面的说明。先分清左右两边各是什么类型，需要的话先转换。",
    points: [
      { term: "类型", text: "值有类型。同样的运算符，遇到不同的类型，允许的操作不一样。" },
      { term: "先看两边", text: "报错通常会写出两个类型的名字。先确认它们是什么，再决定要不要转换。" }
    ] },
  { lang: "Python", name: "ValueError", test: /ValueError/, title: "这个值不能这样用",
    meaning: "类型算对，但具体的值不合法。例如把不是数字的文字转成 int。",
    look: "看被转换的内容。空串、空格、小数交给 int，都会失败。先检查，再转换。",
    points: [
      { term: "值和类型", text: "类型对了还不够。int(\"3.14\") 的类型是字符串，但内容不是整数，所以失败。" },
      { term: "先检查", text: "转换前看一下内容。空字符串和空格都不是数字。" }
    ] },
  { lang: "Python", name: "IndexError", test: /IndexError/, title: "列表没有这个位置",
    meaning: "下标超出了列表范围。空列表取第 0 个就会这样。",
    look: "先看列表长度。下标从 0 到长度减 1。取之前判断列表不是空的。",
    points: [
      { term: "从 0 数", text: "第一个是 0，最后一个是 len(列表) - 1。用 len 当下标会越界。" },
      { term: "空列表", text: "长度为 0 时没有第 0 项。取之前先判断列表不是空的。" }
    ] },
  { lang: "Python", name: "KeyError", test: /KeyError/, title: "字典里没有这个键",
    meaning: "用方括号取键时，这个键不在字典里。",
    look: "看引号中的键。拼写和大小写都要一致。不确定时用 dict.get(键)，没有就得到 None，而不会报错。",
    points: [
      { term: "键", text: "字典按键取值。键不在里面，用方括号就会停。大小写不同也算不在。" },
      { term: "get", text: "拿不准键在不在时，用字典.get(键)。没有这个键会得到 None，程序继续走。" }
    ] },
  { lang: "Python", name: "'NoneType' object has no attribute", test: /'NoneType' object has no attribute/, title: "在 None 上取了属性", rank: 2,
    meaning: "点号左边是 None。None 上面没有任何方法或字段。",
    look: "看点号左边是哪一次得到的。函数忘了 return、查找没有结果，都会变成 None。先判断，再点。",
    points: [
      { term: "None", text: "表示没有值。它不是空列表，也不是空字符串，上面不能点方法。" },
      { term: "忘记 return", text: "函数如果没有 return，调用结果就是 None。接着对它点方法，就会是这条错。" }
    ] },
  { lang: "Python", name: "NoneType", test: /NoneType/, title: "这个值是 None", rank: 2,
    meaning: "参与操作的值是 None。空值不能被当成列表、数字或对象继续用。",
    look: "搜索 NoneType 旁边你写的那个变量。它从哪个函数来，那个函数有没有可能什么都没返回。",
    points: [
      { term: "None", text: "Python 用 None 表示这里没有一个有效的值。" },
      { term: "先判断再使用", text: "拿到一个可能为空的结果时，先看它是不是 None，再做下一步。" }
    ] },
  { lang: "Python", name: "AttributeError", test: /AttributeError/, title: "对象没有这个属性",
    meaning: "点号右边的名字，左边的对象上不存在。左边如果是 None，也会报这个。",
    look: "先看点号左边是不是 None。再核对右边的方法名是不是这个类型真正有的，大小写是否一致。",
    points: [
      { term: "属性和方法", text: "点号右边必须是这个对象真的有的名字。拼写差一个字母就不存在。" },
      { term: "先确认左边", text: "左边如果已经是 None，右边写得再对也会失败。先看左边是什么类型。" }
    ] },
  { lang: "Python", name: "ModuleNotFoundError", test: /ModuleNotFoundError/, title: "找不到这个模块",
    meaning: "import 的名字，当前这个 Python 环境里没有。",
    look: "自己写的文件，要和脚本在能被找到的路径上，文件名不要和标准库撞名。别人的库，用你正在运行的那个 Python 来 pip install。",
    points: [
      { term: "import", text: "import 后面的名字，要是已经装好的库，或者你自己的 .py 文件名。" },
      { term: "用同一个 Python", text: "装库时用的 Python，和运行脚本的 Python，必须是同一个。装到别的环境里，这里仍然找不到。" }
    ] },
  { lang: "Python", name: "ImportError", test: /ImportError/, title: "模块里没有这个名字",
    meaning: "包找到了，但里面没有你要导入的函数或类。",
    look: "看 cannot import name 后面的词。对照那个模块里实际的函数名，版本不同时名字可能变了。",
    points: [
      { term: "from import", text: "from 模块 import 名字，表示模块已经找到，但那个名字要在模块里真实存在。" },
      { term: "名字会变", text: "库升级以后，旧的函数名可能换了。对照你安装的版本里的实际名字。" }
    ] },
  { lang: "Python", name: "FileNotFoundError", test: /FileNotFoundError/, title: "找不到文件",
    meaning: "open 使用的路径上没有文件。",
    look: "相对路径从你执行命令的文件夹算，不是从 .py 文件所在文件夹算。把路径打印出来核对。",
    points: [
      { term: "相对路径", text: "不写完整盘符时，起点是你运行 python 的文件夹，不是脚本文件旁边。" },
      { term: "把路径打印出来", text: "open 之前把路径打印出来，和资源管理器里的位置对一下。" }
    ] },
  { lang: "Python", name: "ZeroDivisionError", test: /ZeroDivisionError/, title: "除数是 0",
    meaning: "除法或取余的右边是 0。",
    look: "看除号右边的变量。它从哪来，为什么会变成 0。除之前先判断。",
    points: [
      { term: "除数", text: "除号右边是 0 时，Python 会停。取余的右边是 0 也一样。" },
      { term: "先判断", text: "除数来自变量时，先看它是不是 0，再做除法。" }
    ] },
  { lang: "Python", name: "RecursionError", test: /RecursionError/, title: "递归没有停",
    meaning: "函数不断调用自己，超过了允许的层数。",
    look: "找到函数调用自己的那一行。写一个不再递归的条件，并确认每次都会更接近它。",
    points: [
      { term: "递归", text: "函数调用自己时，要有一种情况直接返回。" },
      { term: "每次更接近出口", text: "只写了 if 还不够。传入的数据每次都要变小，或变到能停的那种情况。" }
    ] },
  { lang: "Python", name: "PermissionError", test: /PermissionError/, title: "没有权限动这个文件",
    meaning: "文件在，但当前程序不能读或不能写。它可能正被别的程序打开。",
    look: "关掉正在占用它的程序，或换一个你有权限的路径。不要对系统目录直接写。",
    points: [
      { term: "文件被占用", text: "表格或编辑器正打开这个文件时，别的程序往往不能再写它。" },
      { term: "换路径", text: "不要往系统目录里写。换到你的项目文件夹再试。" }
    ] },
  { lang: "Python", name: "UnicodeDecodeError", test: /UnicodeDecodeError/, title: "文件编码读不对",
    meaning: "你用一种编码去读文件，文件实际是另一种编码。",
    look: "open 时写上 encoding。中文文本在 Windows 上常常是 gbk 或 utf-8。不确定就先试 utf-8。",
    points: [
      { term: "编码", text: "文件里的中文是按某种编码存的。用错编码去读，字节就变不成文字。" },
      { term: "encoding", text: "open 时写上 encoding=\"utf-8\"。如果还是失败，再试 gbk。保存文件时也固定用同一种。" }
    ] },
  { lang: "Python", name: "UnicodeEncodeError", test: /UnicodeEncodeError/, title: "文字写不进这种编码",
    meaning: "你要把文字写成某种编码，里面有它表示不了的字符。",
    look: "看 codec 后面的编码名。写文件时用 utf-8。如果必须用别的编码，先确认文字里没有它装不下的字符。",
    points: [
      { term: "写和读是一对", text: "用什么编码写，以后就要用什么编码读。utf-8 能装下常见的中文。" },
      { term: "编码装不下", text: "有的编码没有某个字。换 utf-8，或去掉那个它无法表示的字符。" }
    ] },
  { lang: "Python", name: "JSONDecodeError", test: /JSONDecodeError/, title: "这段文字不是合法的 JSON",
    meaning: "json.loads 或 json.load 收到的内容，不是完整、合法的 JSON。",
    look: "先把原文打印出来。它应该以 { 或 [ 开头。单引号、末尾多一个逗号、空文件，都不算 JSON。",
    points: [
      { term: "JSON", text: "JSON 是一种文本格式。键和字符串要用双引号，不能用单引号，也不能加注释。" },
      { term: "先看原文", text: "解析失败时，先打印你拿到的那一段。空文件和网页报错页都不是 JSON。" }
    ] },
  { lang: "Python", name: "ConnectionRefusedError", test: /ConnectionRefusedError/, title: "对方没有接受连接",
    meaning: "你要连接的地址和端口上，没有程序在等。服务没开，或端口写错了。",
    look: "看地址和端口。先确认服务已经启动，再确认代码里的端口和它一致。",
    points: [
      { term: "端口", text: "端口是同一台机器上区分程序的号码。连错号码，就不会有程序接。" },
      { term: "先开服务", text: "客户端去连接之前，服务端要已经在那个端口上等着。" }
    ] },
  { lang: "Python", name: "IsADirectoryError", test: /IsADirectoryError/, title: "这个路径是文件夹，不是文件",
    meaning: "你把一个文件夹交给了只接受文件的操作，例如按文件去读它。",
    look: "看路径。如果要读里面的文件，把文件名补上。如果要看文件夹里有什么，换用列目录的方法。",
    points: [
      { term: "文件和文件夹", text: "文件夹是容器，不能用读文件的方式打开它的内容。" },
      { term: "把路径补完整", text: "要读的是里面某个文件时，路径要写到那个文件名，不能停在文件夹。" }
    ] },
  { lang: "Python", name: "NotADirectoryError", test: /NotADirectoryError/, title: "这个路径不是文件夹",
    meaning: "你把它当成文件夹去列里面的内容，它其实是一个文件。",
    look: "看路径是不是多写了一层，或把文件名当成了目录名。",
    points: [
      { term: "目录", text: "只有文件夹才能列出里面的成员。文件本身没有下一层。" },
      { term: "看最后一段", text: "路径最后一段如果是文件名，就不要再把它当文件夹用。" }
    ] },
  { lang: "Python", name: "EOFError", test: /EOFError/, title: "还在读输入，输入已经结束了",
    meaning: "input 还想再读一行，但输入已经没有了。",
    look: "看是不是输入文件到了末尾，或管道里的内容已经读完。读之前要有内容，或者抓住这种结束。",
    points: [
      { term: "input", text: "input() 要等一行文字。没有下一行时，它不会返回空字符串，而是停下来报这个错。" },
      { term: "输入结束", text: "从文件或管道读时，内容读完就是结束。不要假设后面永远还有一行。" }
    ] },

  { lang: "MySQL", name: "ERROR 1045", test: /ERROR\s+1045|Access denied for user/i, title: "账号或密码被拒绝",
    meaning: "MySQL 不接受这次登录。用户名、密码或允许登录的主机不对。",
    look: "看 user 和 host。localhost 和 127.0.0.1 在 MySQL 里可以是两个不同账号。密码区分大小写。",
    points: [
      { term: "账号和主机", text: "MySQL 的用户是「名字@从哪连来」。同样的名字，从 localhost 和从别的地址连，可以是两个账号。" },
      { term: "密码", text: "密码区分大小写。被拒绝时，先核对用户名、密码和主机这三样。" }
    ] },
  { lang: "MySQL", name: "Unknown database", test: /ERROR\s+1049|Unknown database/i, title: "没有这个数据库",
    meaning: "你要使用的数据库名字，服务器上不存在。",
    look: "先 SHOW DATABASES。名字要完全一致。还没创建就先 CREATE DATABASE。",
    points: [
      { term: "数据库", text: "数据库是表的容器。名字写错，或还没创建，就进不去。" },
      { term: "SHOW DATABASES", text: "先列出服务器上有哪些库，再 USE 那个真实存在的名字。" }
    ] },
  { lang: "MySQL", name: "No database selected", test: /ERROR\s+1046|No database selected/i, title: "还没选定数据库",
    meaning: "语句要用到表，但当前连接没有选定数据库。",
    look: "先执行 USE 数据库名，或把表写成 数据库名.表名。",
    points: [
      { term: "USE", text: "连接上服务器以后，还要选定一个库。没选定时，单独写表名不知道属于哪个库。" },
      { term: "库名.表名", text: "也可以把表写成 库.表，这样不用先 USE。" }
    ] },
  { lang: "MySQL", name: "Unknown column", test: /ERROR\s+1054|Unknown column/i, title: "没有这一列",
    meaning: "语句里的列名，在这张表上不存在。",
    look: "看 Unknown column 后面的名字。用 DESC 表名对照。别名、大小写、多余的空格都会对不上。",
    points: [
      { term: "列名", text: "列名必须和表结构里的一致。多一个字母、少一个字母，都算没有这一列。" },
      { term: "DESC", text: "DESC 表名 可以列出这张表真正有哪些列。先对照，再改语句。" }
    ] },
  { lang: "MySQL", name: "in field list is ambiguous", test: /ERROR\s+1052|in field list is ambiguous|in where clause is ambiguous|in order clause is ambiguous/i, title: "这个列名好几张表里都有",
    meaning: "查询用了多张表，这个列名在不止一张表里出现。数据库不知道你指哪一张。",
    look: "看列名。把它写成 表名.列名。SELECT、WHERE、ORDER BY 里都要写清楚。",
    points: [
      { term: "多表", text: "两张表都有 id 或 name 时，只写列名，数据库无法判断是哪一张的。" },
      { term: "表名.列名", text: "写成 users.name 这种形式，列就唯一了。" }
    ] },
  { lang: "MySQL", name: "You have an error in your SQL syntax", test: /ERROR\s+1064|You have an error in your SQL syntax/i, title: "SQL 语句写错了",
    meaning: "这句话不符合 SQL 语法。报错会指出它开始看不懂的位置附近。",
    look: "看 near 后面的那一小段。关键字是否拼错，引号和括号是否成对，字符串要用引号而不是裸字。",
    points: [
      { term: "near", text: "near 后面是数据库开始看不懂的地方。真正写错的字，常常就在它前面一点。" },
      { term: "关键字", text: "SELECT、FROM、WHERE 要按这个顺序。FORM 这种拼写，数据库不会当成 FROM。" }
    ] },
  { lang: "MySQL", name: "Duplicate entry", test: /ERROR\s+1062|Duplicate entry/i, title: "重复了，不能再插入",
    meaning: "主键或唯一键已经有同样的值。再插入一条相同的，会被拒绝。",
    look: "看 Duplicate entry 里的值，以及 for key 里的键名。改掉重复值，或先决定是更新旧行还是放弃插入。",
    points: [
      { term: "主键", text: "主键用来唯一标识一行。同一个值不能插入第二次。" },
      { term: "唯一键", text: "被标成唯一的列也一样。报错里的 for key 会告诉你是哪一个键重复了。" }
    ] },
  { lang: "MySQL", name: "Table 'db.t' doesn't exist", test: /ERROR\s+1146|Table '.+' doesn't exist/i, title: "没有这张表",
    meaning: "语句里的表，在当前数据库中不存在。",
    look: "看表名。先 USE 到正确的库，再 SHOW TABLES。名字差一个字母也算没有。",
    points: [
      { term: "当前库", text: "表名只在选定的那个数据库里找。库选错了，表像是不存在。" },
      { term: "SHOW TABLES", text: "先列出当前库里的表，再核对语句里的名字。" }
    ] },
  { lang: "MySQL", name: "Table 'db.t' already exists", test: /ERROR\s+1050|Table '.+' already exists/i, title: "表已经存在",
    meaning: "你在创建一张已经有的表。",
    look: "如果是重跑脚本，先判断表在不在，或使用 CREATE TABLE IF NOT EXISTS。不要直接删表，除非你确定里面的数据可以不要。",
    points: [
      { term: "CREATE TABLE", text: "创建是建一张新表。同名的表还在时，不能再创建一次。" },
      { term: "IF NOT EXISTS", text: "脚本可能重跑时，加上 IF NOT EXISTS，表已经在就不会再报这次错。" }
    ] },
  { lang: "MySQL", name: "Column count doesn't match", test: /ERROR\s+1136|Column count doesn't match/i, title: "列的数量对不上",
    meaning: "INSERT 写出的列数，和 VALUES 里的值的个数不一样。",
    look: "把列名和值逐个对齐。少写或多写一个逗号，都会错位。",
    points: [
      { term: "列和值一一对应", text: "INSERT 写了几列，VALUES 里就要有几个值，顺序也要一致。" },
      { term: "逗号", text: "多一个或少一个逗号，个数就会错。把列名和值分成两行对着看。" }
    ] },
  { lang: "MySQL", name: "doesn't have a default value", test: /ERROR\s+1364|doesn't have a default value/i, title: "这一列没有值，也没有默认值",
    meaning: "插入时漏了这一列。它又不允许空着，表结构里也没有默认值。",
    look: "看 Field 后面的列名。INSERT 里把它补上，或者先确认表结构是否应该有默认值。",
    points: [
      { term: "INSERT 的列", text: "没写进 INSERT 的列，会使用默认值。没有默认值又不许为空，就不能省略。" },
      { term: "NOT NULL", text: "不许为空的列，插入时必须给一个合法的值。" }
    ] },
  { lang: "MySQL", name: "Incorrect datetime value", test: /ERROR\s+1292|Incorrect datetime value/i, title: "日期或时间的格式不对", rank: 2,
    meaning: "这一列要日期或时间，你给的文字不是它能接受的格式。",
    look: "看给你的值。日期通常写成 2026-10-16，时间写成 21:05:00。空字符串不能当成日期。",
    points: [
      { term: "日期格式", text: "MySQL 的日期一般是年-月-日，例如 2026-10-16。写成 16/10/2026 常常不被接受。" },
      { term: "不要塞空字符串", text: "日期列不能用空字符串凑数。没有日期时要看这一列允不允许 NULL。" }
    ] },
  { lang: "MySQL", name: "Incorrect string value", test: /ERROR\s+1366|Incorrect (?:string|integer|double|float) value/i, title: "这个值的类型不对",
    meaning: "某一列要数字或日期，你给了它不能转换的文字。",
    look: "看 column 的名字和给你的值。空字符串不能填进整数列。类型和值要对上。",
    points: [
      { term: "列的类型", text: "整数列只能装能变成整数的值。字母和空字符串都不行。" },
      { term: "值和列对齐", text: "看报错里的列名，再看你放进这一列的那个值，是不是这种类型装得下的。" }
    ] },
  { lang: "MySQL", name: "Out of range value", test: /ERROR\s+1264|Out of range value/i, title: "数字超出了这一列的范围",
    meaning: "值是数字，但比这一列允许的最大或最小还要超出。",
    look: "看列的类型。更小的整数类型装不下太大的数。先确认是不是写错列，或数字多写了位数。",
    points: [
      { term: "范围", text: "不同的整数类型有上限。超过上限，这一列拒绝写入。" },
      { term: "对一下位数", text: "先看这个数是不是多打了位数，再决定是改值，还是这列本来就该用更大的类型。" }
    ] },
  { lang: "MySQL", name: "Data too long", test: /ERROR\s+1406|Data too long/i, title: "文字太长，列放不下",
    meaning: "要写入的内容，超过了这一列规定的长度。",
    look: "看列名。对照表结构里的 VARCHAR 长度。缩短内容，或先确认是不是写错列。",
    points: [
      { term: "VARCHAR", text: "这种列有最大长度。超过那个字数，整次写入会失败。" },
      { term: "先看是不是写错列", text: "内容异常地长时，先确认没有把别的字段塞进这一列。" }
    ] },
  { lang: "MySQL", name: "Cannot add or update a child row", test: /ERROR\s+1452|Cannot add or update a child row/i, title: "外键对不上",
    meaning: "你写入的外键值，在被引用的那张表里不存在。",
    look: "看报错里的 CONSTRAINT。先往主表插入对应的那一行，再写子表。不要填一个主表没有的编号。",
    points: [
      { term: "外键", text: "子表里的这个编号，必须在主表里已经有一行。主表没有 5 号，子表就不能引用 5。" },
      { term: "先写主表", text: "插入顺序是先有被引用的那一行，再写引用它的这一行。" }
    ] },
  { lang: "MySQL", name: "Cannot delete or update a parent row", test: /ERROR\s+1451|Cannot delete or update a parent row/i, title: "还有别的行引用它，不能删",
    meaning: "你要删或改主表的这一行，子表里还有外键指着它。",
    look: "看 CONSTRAINT。先处理子表里引用它的那些行，再改主表。不要为了删掉而直接关掉外键。",
    points: [
      { term: "被引用的行", text: "还有子表指着这行时，删掉它会让那些外键失去目标。" },
      { term: "先处理子表", text: "先删掉或改掉子表里的引用，再回来删主表的这一行。" }
    ] },
  { lang: "MySQL", name: "only_full_group_by", test: /ERROR\s+1055|only_full_group_by|not in GROUP BY/i, title: "SELECT 里的列没有被分组",
    meaning: "用了聚合或 GROUP BY 时，选出来的普通列必须出现在 GROUP BY 里，否则一组里它有多个值，不知道显示哪一个。",
    look: "看 SELECT 里的列。要么把它加进 GROUP BY，要么对它使用 SUM、COUNT 这类聚合，要么不要把它选出来。",
    points: [
      { term: "GROUP BY", text: "分组以后，每一组要交出一行。没被分组、也没被聚合的列，一组里可能有好几个不同的值。" },
      { term: "聚合", text: "COUNT、SUM、AVG 会把一组收成一个值。普通列做不到这一点，所以要写进 GROUP BY。" }
    ] },
  { lang: "MySQL", name: "Subquery returns more than 1 row", test: /ERROR\s+1242|Subquery returns more than 1 row/i, title: "子查询返回了多行",
    meaning: "这个位置只允许一个值，子查询却给出了多行。",
    look: "看括号里的 SELECT。加上条件让它只返回一行，或改成 IN 来接受多行。不要假设它永远只有一条。",
    points: [
      { term: "子查询", text: "放在等号右边的子查询，只能交出一个值。交出多行时，等号不知道等于哪一个。" },
      { term: "一个值和多行", text: "只想要一个值，就把条件收紧。本来就要多个值，等号要换成 IN。" }
    ] },
  { lang: "MySQL", name: "Can't connect to MySQL server", test: /ERROR\s+2003|Can't connect to MySQL server/i, title: "连不上 MySQL",
    meaning: "程序找不到正在运行的 MySQL，或地址、端口不通。",
    look: "看 host 和端口，默认是 3306。先确认 MySQL 服务已经启动，再确认地址不是写错机器。",
    points: [
      { term: "服务要先开着", text: "没有 MySQL 进程在等，任何客户端都连不上。" },
      { term: "地址和端口", text: "默认端口是 3306。地址要指向数据库所在的那台机器。" }
    ] },
  { lang: "MySQL", name: "Can't connect to local MySQL", test: /ERROR\s+2002|Can't connect to local MySQL/i, title: "连不上本机的 MySQL",
    meaning: "程序想连这台电脑上的 MySQL，但本机服务没开，或套接字、端口不对。",
    look: "先确认本机的 MySQL 服务已经启动。端口默认 3306。不要连一个并没有安装数据库的地址。",
    points: [
      { term: "本机服务", text: "localhost 表示数据库就在这台电脑上。服务没启动，本机也连不上。" },
      { term: "端口", text: "安装时如果改过端口，连接里的端口要和它一致。" }
    ] },
  { lang: "MySQL", name: "Communications link failure", test: /Communications link failure/i, title: "和数据库的连接断了",
    meaning: "Java 程序和 MySQL 之间的连接没有建立，或中途断了。",
    look: "看 JDBC 地址、端口、库名。数据库服务要先开着。地址写 localhost 时，确认服务就在这台电脑上。",
    points: [
      { term: "JDBC 地址", text: "地址里要有主机、端口和库名。其中任何一段写错，连接都建不起来。" },
      { term: "服务先开", text: "程序去连的时候，MySQL 要已经在运行。先开数据库，再启动程序。" }
    ] },

  { lang: "JavaScript", name: "ReferenceError: x is not defined", test: /ReferenceError:.*is not defined/, title: "这个名字不存在",
    meaning: "你使用的变量或函数还没有声明，或者拼写和声明不一致。",
    look: "看 is not defined 前面的名字。搜索声明。浏览器里的名字和 Node 里的名字不是同一套。",
    points: [
      { term: "先声明", text: "用 let、const 或 function 给出这个名字之后，后面才能使用它。" },
      { term: "两套环境", text: "浏览器里的全局名字，和 Node 里的不一样。不要假设这边有的名字那边也有。" }
    ] },
  { lang: "JavaScript", name: "Cannot read properties of undefined", test: /Cannot read propert(?:y|ies)\b.*\bof (?:undefined|null)/, title: "空值上面不能读属性",
    meaning: "点号左边是 undefined 或 null。空的上面没有属性。",
    look: "看 of undefined 或 of null 前面你访问的名字。找到它是哪一次没有得到对象。先判断，再点属性。",
    points: [
      { term: "undefined 和 null", text: "都表示这里没有一个对象。对它们点属性，就会停。" },
      { term: "点号左边", text: "a.b 失败时，先看 a 是不是空，不要先怀疑 b 的拼写。" }
    ] },
  { lang: "JavaScript", name: "Cannot set properties of undefined", test: /Cannot set propert(?:y|ies)\b.*\bof (?:undefined|null)/, title: "空值上面不能赋值",
    meaning: "你想给属性赋值，但点号左边是 undefined 或 null。",
    look: "看被赋值的那个对象从哪来。先让它成为一个对象，再写属性。",
    points: [
      { term: "赋值也要有对象", text: "a.b = 1 要求 a 已经是对象。a 是空的时候，属性没有地方可放。" },
      { term: "先创建", text: "需要一个对象时，先写成 {} 或 new，再给它的属性赋值。" }
    ] },
  { lang: "JavaScript", name: "is not a function", test: /is not a function/, title: "这不是一个函数",
    meaning: "你在调用它，但它的值不是函数。可能拿错变量，也可能多写了一对括号。",
    look: "看 is not a function 前面的名字。把它打印出来，确认它到底是什么。",
    points: [
      { term: "调用", text: "括号表示执行。括号左边必须真的是函数。" },
      { term: "多一层括号", text: "函数已经执行过一次并返回了普通值，再加一对括号，就会把那个值当函数。" }
    ] },
  { lang: "JavaScript", name: "Unexpected token", test: /Unexpected token|Unexpected identifier/, title: "这里多了或少了符号",
    meaning: "语法在这个符号处断了。括号、逗号、引号常常不成对。",
    look: "看 token 后面的符号，以及它的前一个字符。对象最后一项不要多余的逗号，这在旧环境里也会失败。",
    points: [
      { term: "token", text: "就是编译器看到的下一个符号。它说意料之外，表示这个位置不该出现这个符号。" },
      { term: "成对的符号", text: "括号、引号、大括号要成对。少一半时，后面某个符号就会被说成意料之外。" }
    ] },
  { lang: "JavaScript", name: "Unexpected end of JSON", test: /Unexpected end of JSON|is not valid JSON/i, title: "这段文字不是合法的 JSON",
    meaning: "JSON.parse 收到的内容不是完整、合法的 JSON。可能是空的，也可能是 HTML 报错页。",
    look: "先把要解析的原文打印出来。确认它以 { 或 [ 开头，并且网络请求真的返回了 JSON，不是 404 页面。",
    points: [
      { term: "JSON.parse", text: "它只接受合法 JSON 文本。空字符串、单引号、网页 HTML 都不行。" },
      { term: "先看响应", text: "请求失败时，服务器可能返回一页 HTML。不要假设拿到的一定是 JSON。" }
    ] },
  { lang: "JavaScript", name: "Unexpected end of input", test: /Unexpected end of input/, title: "代码或字符串突然结束了",
    meaning: "括号、引号还没配平，内容已经到头了。",
    look: "从末尾往上对括号和引号。少掉的通常在更早的位置。",
    points: [
      { term: "输入结束", text: "解析到最后还在等后半边，说明前面有一个括号或引号没关上。" },
      { term: "从末尾往上对", text: "不要只看最后一行。打开以后没有关上的那个，才是要补的。" }
    ] },
  { lang: "JavaScript", name: "await is only valid", test: /await is only valid/, title: "await 用在了非 async 函数里",
    meaning: "await 只能写在 async 函数里面，或者模块允许顶层 await 的位置。",
    look: "看 await 所在的函数。在 function 前面加上 async，或者不要在普通函数里写 await。",
    points: [
      { term: "async", text: "函数前面写了 async，里面才可以 await。普通函数里写 await 会被拒绝。" },
      { term: "await", text: "await 用来等一个 Promise 完成。它不是在任何地方都能写的关键字。" }
    ] },
  { lang: "JavaScript", name: "Assignment to constant variable", test: /Assignment to constant variable/, title: "常量不能再被赋值",
    meaning: "这个名字是用 const 声明的，你又给它赋了一次值。",
    look: "如果这个值确实会变，把 const 改成 let。如果它不该变，删掉后面那次赋值。",
    points: [
      { term: "const", text: "const 声明的名字不能再指向别的值。后面不能再写一次名字 = 。" },
      { term: "let", text: "需要再次赋值时用 let。只赋值一次的用 const。" }
    ] },
  { lang: "JavaScript", name: "is not iterable", test: /is not iterable/, title: "这个值不能被遍历",
    meaning: "你把它放进了 for...of、展开或解构，但它不是数组、字符串这类能逐项取出的值。",
    look: "看被遍历的名字。undefined 和普通对象不能直接 for...of。先确认它是不是数组。",
    points: [
      { term: "for...of", text: "它要求右边能一项一项交出来。数组可以，普通对象不行。" },
      { term: "先确认是数组", text: "可能是空值，也可能是一个普通对象。打印出来再决定怎么取里面的内容。" }
    ] },
  { lang: "JavaScript", name: "EADDRINUSE", test: /EADDRINUSE/, title: "这个端口已经被占用",
    meaning: "你要监听的端口上，已经有一个程序。两个程序不能听同一个端口。",
    look: "看端口数字。关掉上一次没关的服务，或换一个端口。",
    points: [
      { term: "端口", text: "一个端口同时只能有一个程序在听。第二个再听同一个，就会失败。" },
      { term: "上次没关", text: "开发时常见的原因是上一次的服务还开着。先停掉它，或换一个端口号。" }
    ] },
  { lang: "JavaScript", name: "ENOENT", test: /ENOENT/, title: "找不到这个路径",
    meaning: "Node 要读或写的文件不存在。",
    look: "看报错里的路径。相对路径从你运行 node 的文件夹算。文件名大小写在部分系统上有区别。",
    points: [
      { term: "相对路径", text: "从你执行 node 的文件夹开始算，不是从 js 文件所在的文件夹开始算。" },
      { term: "文件要先在", text: "要读的文件不存在时，Node 不会替你创建。先核对路径和文件名。" }
    ] },
  { lang: "JavaScript", name: "npm ERR!", test: /npm ERR!/, title: "npm 这次没有成功",
    meaning: "安装或运行脚本失败。真正的原因通常在 npm ERR! 上面几行，不在最后的错误码。",
    look: "往上找第一段具体说明。常见是包名拼错、网络中断，或 Node 版本和这个包要求的不一致。",
    points: [
      { term: "看上面几行", text: "最后一行的错误码往往只是结果。具体原因写在更上面的那一段。" },
      { term: "包名和版本", text: "包名拼错、网络中断，或当前 Node 版本低于这个包的要求，都会让 npm 停下来。" }
    ] },
  { lang: "JavaScript", name: "Cannot find module", test: /Cannot find module|ERR_MODULE_NOT_FOUND/, title: "找不到这个模块",
    meaning: "require 或 import 的路径，在当前项目里不存在。",
    look: "看模块名。自己的文件要写对相对路径，别人的包要先安装。运行命令的文件夹要是项目所在的地方。",
    points: [
      { term: "相对路径", text: "自己的文件通常以 ./ 或 ../ 开头。少写这一点，Node 会去 node_modules 里找。" },
      { term: "先安装", text: "别人的包要出现在 node_modules 里。没安装就 import，一定会找不到。" }
    ] },
  { lang: "JavaScript", name: "Missing initializer in const", test: /Missing initializer in const/, title: "const 声明时必须赋值",
    meaning: "const 不能只写名字。声明的同时就要给值。",
    look: "在这一行等号右边补上初值。如果现在还没有值，改用 let。",
    points: [
      { term: "const 要有初值", text: "const 名字 = 值。不能像 let 那样先声明、以后再赋值。" },
      { term: "还没有值就用 let", text: "值要过一会儿才有时，用 let。const 适合声明时就已经确定的名字。" }
    ] },
  { lang: "JavaScript", name: "has already been declared", test: /has already been declared/, title: "这个名字已经声明过了",
    meaning: "同一个范围里，let 或 const 又声明了一次同一个名字。",
    look: "搜索这个名字。留下一个声明。后面只赋值的话，不要再写 let 或 const。",
    points: [
      { term: "一个范围一个名字", text: "同一层里，let 和 const 不能把同一个名字声明两次。" },
      { term: "再次赋值不要带 let", text: "第一次写 let n = 1。后面改值只写 n = 2。" }
    ] },

  { lang: "C/C++", name: "error: expected", test: /error: expected/, title: "这里缺了语法要求的东西",
    meaning: "编译器期待一个分号、括号或声明，但看到了别的。",
    look: "看 expected 后面的词，以及报错行的上一行。少掉的符号经常在上一句。",
    points: [
      { term: "expected", text: "编译器在说它这里本来想看到什么。那个词就是缺的东西，或位置错了的东西。" },
      { term: "看上一行", text: "标出的行经常是发现错误的地方。少掉的分号多半在上一句。" }
    ] },
  { lang: "C/C++", name: "was not declared in this scope", test: /was not declared in this scope|undeclared identifier|not declared in this scope/, title: "这个名字还没声明",
    meaning: "编译器在当前范围内找不到这个变量或函数。",
    look: "看名字是否拼错，声明是否写在使用之前，头文件有没有包含。",
    points: [
      { term: "先声明", text: "变量和函数要在使用之前能被看见。写在后面、又没有提前声明，当前这行就不认识它。" },
      { term: "头文件", text: "函数如果来自别的文件，要先 include 对应的头文件，编译器才知道有这个名字。" }
    ] },
  { lang: "C/C++", name: "undefined reference to", test: /undefined reference to/, title: "声明了，但链接时找不到实现",
    meaning: "编译看得到声明，链接时找不到函数或变量的实体。",
    look: "看函数名。它的实现在哪个源文件，那个文件有没有一起编译、一起链接。",
    points: [
      { term: "声明和定义", text: "头文件里的声明只说明有这个函数。真正的函数体要在某个源文件里，并且参与链接。" },
      { term: "一起编译", text: "只编译了调用它的那个文件，没有编译实现所在的文件，链接时就会缺这一块。" }
    ] },
  { lang: "C/C++", name: "Segmentation fault", test: /Segmentation fault|segfault/i, title: "程序访问了不该访问的内存",
    meaning: "常见是使用了空指针、越界，或使用了已经释放的内存。编译通常不会提前告诉你。",
    look: "回忆最近一次解引用的指针。它有没有分配，下标有没有越过数组。用调试器看停在哪一行。",
    points: [
      { term: "指针", text: "指针里应该是一块有效内存的地址。空指针或乱掉的地址，一用就会这样。" },
      { term: "越界", text: "数组用过了最后一格，也会访问到不属于它的内存。编译阶段经常不报这个。" }
    ] },
  { lang: "C/C++", name: "no matching function", test: /no matching function|no match for/, title: "没有参数对得上的函数",
    meaning: "你调用的函数名存在，但参数的个数或类型对不上任何一个重载。",
    look: "看你传入的类型，和函数声明逐个比较。const、引用、指针都算不同。",
    points: [
      { term: "重载", text: "同名函数可以有多份，靠参数区别。每一份都对不上，就是这次调用不对。" },
      { term: "类型要一致", text: "const、引用和指针都是不同的参数类型。看起来像，编译器不把它们当成同一个。" }
    ] },
  { lang: "C/C++", name: "error: stray \\", test: /error: stray\s+['‘’\\]/i, title: "文件里有不认识的字符",
    meaning: "源代码里混进了中文引号、全角符号或看不见的奇怪字符。",
    look: "看那一行的引号和分号。把它们换成英文符号。从网页复制的代码经常带进全角引号。",
    points: [
      { term: "全角符号", text: "中文引号和中文分号看起来像代码符号，编译器会把它们当成乱码。" },
      { term: "重新打那一行", text: "从网页复制的一行，最省事的办法是删掉，用英文符号手打一遍。" }
    ] },
  { lang: "C/C++", name: "missing terminating", test: /missing terminating/, title: "字符串没有结束",
    meaning: "引号只有开头，没有在这一行结束。",
    look: "看字符串末尾。中文引号不能用来结束英文引号。一行没写完就换行，也会这样。",
    points: [
      { term: "引号成对", text: "字符串的开始和结束要用同一种英文引号。" },
      { term: "不要中途换行", text: "普通字符串要在这一行里结束。没结束就换行，编译器会停在这里。" }
    ] },
  { lang: "C/C++", name: "redefinition of", test: /redefinition of/, title: "这个名字定义了两次",
    meaning: "同一个变量、函数或类型有了两份定义。",
    look: "搜索这个名字。头文件如果会被包含多次，定义不要直接写在头文件里，或加上防止重复包含的保护。",
    points: [
      { term: "定义只能有一份", text: "声明可以出现多次，函数体或变量定义只能有一份。" },
      { term: "头文件重复包含", text: "同一个头文件被间接包含两次时，里面的定义也会出现两次。" }
    ] },
  { lang: "C/C++", name: "control reaches end of non-void", test: /control reaches end of non-void/, title: "有一条路没有返回值",
    meaning: "函数声明了要返回数据，但有的路径会走到函数末尾，仍然没有 return。",
    look: "把每条 if 走到最后。走到结尾却没 return 的那条，就是要补的。",
    points: [
      { term: "非 void", text: "函数说了要返回一个值，每一种走法都要 return。" },
      { term: "走到末尾", text: "编译器发现有一条路会走到右大括号，却还没返回。补上那条路的 return。" }
    ] },
  { lang: "C/C++", name: "invalid conversion", test: /invalid conversion/, title: "这个类型不能这样转换",
    meaning: "你把一种类型交给了另一种类型，编译器不允许这种转换。",
    look: "看 from 和 to。指针、const、整数之间不要靠猜测硬转。先让两边的类型一致。",
    points: [
      { term: "转换", text: "不是所有类型都能自动变成另一种。编译器拒绝时，说明这两边本来就不是同一种东西。" },
      { term: "const", text: "承诺不修改的指针，不能随便交给一个可以修改的指针。" }
    ] },
  { lang: "C/C++", name: "too few arguments", test: /too (?:few|many) arguments/, title: "参数个数不对",
    meaning: "调用时传的参数个数，和函数声明不一致。",
    look: "把声明里的参数和调用时的括号逐个对齐。多了或少了都要改调用，或者改声明并一起改实现。",
    points: [
      { term: "声明说了几个", text: "函数声明里有几个参数，调用时就要传几个。不能少，也不能多。" },
      { term: "声明和实现一起改", text: "如果是你自己的函数，改了声明就要改实现，调用的地方也要一起改。" }
    ] },

  { lang: "HTML", name: "Stray end tag", test: /Stray end tag/i, title: "多了一个结束标签",
    meaning: "这里有一个结束标签，但前面没有对应的开始标签。标签被提前关掉了，或者写反了。",
    look: "看报错里的标签名。往上找同名的开始标签。多出来的那个结束标签删掉，或补上开始标签。",
    points: [
      { term: "开始和结束", text: "普通标签要成对。先有 <div>，后有 </div>。多出来的结束标签没有东西可关。" },
      { term: "名字要一致", text: "关上的必须是最近还没关的那个名字。写错名字，就会剩一个结束标签。" }
    ] },
  { lang: "HTML", name: "Unclosed element", test: /Unclosed element/i, title: "有标签没有关上",
    meaning: "某个开始标签一直没有对应的结束标签，解析到后面还在等它。",
    look: "看指出的标签名。从它开始往下数，开始和结束要成对。漏掉的通常是更早的那一层，不一定是最后一行。",
    points: [
      { term: "元素要关上", text: "除了少数空元素，开始标签都要有结束标签。没关上，里面和后面的结构都会乱。" },
      { term: "先关里面", text: "里层还开着时，不能先关外层。漏掉的经常是更早打开的那一个。" }
    ] },
  { lang: "HTML", name: "there were open elements", test: /there were open elements|there were unclosed elements|End tag .* was not expected/i, title: "这个结束标签出现得太早",
    meaning: "结束标签出现时，里面还有别的标签没关。顺序叠在一起了。",
    look: "看这个结束标签前面最近的开始标签。先关上里面的，再关上外面的。",
    points: [
      { term: "后开的先关", text: "标签像叠在一起的盒子。最后打开的那个，要最先关上。" },
      { term: "不要交叉", text: "<a><b></a></b> 这种交叉是不合法的。要写成 <a><b></b></a>。" }
    ] },
  { lang: "HTML", name: "must have an alt attribute", test: /must have an\s+\W*alt\W*\s+attribute/i, title: "图片缺少替代文字",
    meaning: "img 需要 alt。没有图片时，读屏幕的人不知道这里是什么。",
    look: "给这个 img 加上 alt。装饰性图片可以写成空的 alt。有内容的图片用短句说明画面。",
    points: [
      { term: "alt", text: "图片加载失败或不能看图片时，alt 里的文字会代替画面。" },
      { term: "装饰图片", text: "纯装饰、没有信息的图片，alt 写成空字符串。不要为了应付检查写一串无关的字。" }
    ] },
  { lang: "HTML", name: "Duplicate ID", test: /Duplicate ID/i, title: "同一个 id 用了两次",
    meaning: "一个页面里，同一个 id 只能出现一次。重复了，脚本和样式会找错元素。",
    look: "搜索这个 id。留下一个，另一个改成别的 id，或改成 class。",
    points: [
      { term: "id", text: "id 是这一页里的唯一名字。同一个名字出现两次，按 id 去找就不确定是哪一个。" },
      { term: "class", text: "想给好几处用同一种样式时，用 class。class 可以重复，id 不可以。" }
    ] },
  { lang: "HTML", name: "Bad value", test: /Bad value\b/i, title: "属性的值不合法",
    meaning: "这个属性只接受规定的几种值，你写的不在里面。",
    look: "看属性的名字和 Bad value 里的内容。对照这种标签允许的写法，不要自造一个值。",
    points: [
      { term: "属性值有范围", text: "有些属性不能随便写。type、method 这类只接受规定好的那几个词。" },
      { term: "对照标签", text: "先看这是哪种标签的哪个属性，再用它允许的值。不要凭感觉造一个。" }
    ] },
  { lang: "HTML", name: "Quote expected", test: /Quote expected/i, title: "属性值少了引号",
    meaning: "属性值应该放在引号里，这里的引号没有写完。",
    look: "把值写成 名字=\"值\"。开始和结束都用英文引号。中文引号不能用在这里。",
    points: [
      { term: "属性的写法", text: "一个属性是名字、等号、引号里的值。例如 class=\"card\"。" },
      { term: "英文引号", text: "开始和结束都要用英文引号。少一个，后面的内容都会被当成值的一部分。" }
    ] },
  { lang: "HTML", name: "No space between attributes", test: /No space between attributes/i, title: "两个属性贴在一起了",
    meaning: "同一个标签里的两个属性之间要有空格。现在它们连成了一串。",
    look: "在前一个属性的结束引号后面加一个空格，再写下一个属性。",
    points: [
      { term: "属性之间要空格", text: "class=\"a\" id=\"b\" 中间有空格。贴在一起会被当成一个写坏的属性。" },
      { term: "一个属性一份引号", text: "每个值都有自己的一对引号。不要让两个属性共用一段引号。" }
    ] },
  { lang: "HTML", name: "expecting an attribute name", test: /expecting an attribute name|Attribute name expected/i, title: "这里应该是属性名",
    meaning: "标签里面这个位置应该写属性名，却看到了别的符号。常见是少了 >，或引号没配对。",
    look: "看这个标签有没有在该结束的地方写上 >。再看前面的引号是否成对。",
    points: [
      { term: "标签要有 >", text: "开始标签以 > 结束。少了它，后面的内容还会被当成标签里面的东西。" },
      { term: "属性名", text: "等号左边是属性名。这个位置如果出现奇怪符号，先把前一个属性的引号补上。" }
    ] },
  { lang: "HTML", name: "not allowed as child of", test: /not allowed as child of/i, title: "这个标签不能放在这里",
    meaning: "这种标签不能直接放进当前的父标签里。位置不合规则。",
    look: "看 child of 后面的父标签。例如 p 里面不能再放 div，li 必须放在 ul 或 ol 里。把元素挪到允许的父级下面。",
    points: [
      { term: "父子关系", text: "不是所有标签都能套在一起。有的标签只允许特定的孩子。" },
      { term: "常见限制", text: "li 要放在 ul 或 ol 里。div 这样的块级元素不要直接塞进 p 里面。" }
    ] },
  { lang: "HTML", name: "Duplicate attribute", test: /Duplicate attribute/i, title: "同一个属性写了两次",
    meaning: "同一个标签上，这个属性出现了两次。浏览器不好判断该听哪一个。",
    look: "搜索这个标签上的同名属性。留下一个，把值合并进去。class 要写在同一个属性里，用空格分开多个类名。",
    points: [
      { term: "一个属性一次", text: "同一个开始标签里，同名属性不要写两遍。" },
      { term: "多个类名", text: "几个 class 写在同一个 class 里，用空格分开，不要写两个 class=。" }
    ] },

  { lang: "CSS", name: "unknown property", test: /unknown property/i, title: "没有这个样式属性",
    meaning: "这个属性名不是 CSS 里的名字。多半是拼写错了。",
    look: "看属性名。colour 要写成 color，centre 要写成 center。对照这一行想实现的效果，用标准属性名。",
    points: [
      { term: "属性名是规定的", text: "CSS 的属性名不能按单词意思自己造。拼写要用规范里的那一个。" },
      { term: "美式拼写", text: "颜色是 color，不是 colour。居中相关的单词是 center，不是 centre。" }
    ] },
  { lang: "CSS", name: "property value expected", test: /property value expected/i, title: "属性的值没写上",
    meaning: "冒号后面应该是一个值，这里是空的，或值还没写完。",
    look: "看冒号右边。补上值，例如颜色、长度或关键字，然后写分号。",
    points: [
      { term: "声明的三部分", text: "一条声明是属性、冒号、值，最后加分号。缺了值，这一条不完整。" },
      { term: "值的种类", text: "颜色、长度、关键字都是值。先确定这个属性接受哪一种，再写上去。" }
    ] },
  { lang: "CSS", name: "Invalid property value", test: /Invalid property value|Error in parsing value for/i, title: "这个属性的值写错了",
    meaning: "属性名对，但后面的值不合法。单位、颜色或关键字不对。",
    look: "看冒号右边。颜色要像 #336699，长度要带单位，例如 16px。0 可以不带单位，别的数字通常要带。",
    points: [
      { term: "单位", text: "长度一般要带 px、em 或 %。除了 0，单独一个数字通常不是合法长度。" },
      { term: "颜色", text: "颜色可以写 #336699，或 rgb()，或 red 这种关键字。不要写一个随便的词。" }
    ] },
  { lang: "CSS", name: "semi-colon expected", test: /semi-colon expected|semicolon expected/i, title: "声明少了分号", rank: 2,
    meaning: "一条样式声明要用分号结束，下一条才能开始。",
    look: "看上一行的末尾。漏掉的分号常常在上一句，不在报错标出的这一行。",
    points: [
      { term: "分号隔开声明", text: "color: red; font-size: 16px; 每条声明结束都要有分号。" },
      { term: "错在上一句", text: "下一行被指出时，先看上一行末尾有没有分号。" }
    ] },
  { lang: "CSS", name: "colon expected", test: /colon expected/i, title: "属性和值之间少了冒号",
    meaning: "声明应该写成 属性: 值;。这里缺了冒号，或冒号的位置不对。",
    look: "看报错这一行。属性名后面先写冒号，再写值，最后写分号。",
    points: [
      { term: "冒号", text: "属性名和值之间用冒号，不是等号，也不是空格硬分开。" },
      { term: "一条声明", text: "先写属性，再写冒号，再写值，最后写分号。" }
    ] },
  { lang: "CSS", name: "at-rule or selector expected", test: /at-rule or selector expected/i, title: "这里不该出现这段内容",
    meaning: "样式表的这一处应该是选择器，或者 @ 开头的规则。现在的内容对不上。",
    look: "看上一块的大括号有没有关上。选择器不要写成标签里面的文字。多余的分号或括号先删掉再看。",
    points: [
      { term: "选择器", text: "样式块的开头应该是选谁，例如 p、.card、#title。不是一段普通句子。" },
      { term: "上一块要关上", text: "上一对大括号没关上时，后面的选择器会被看成还在里面，位置就错了。" }
    ] },
  { lang: "CSS", name: "empty ruleset", test: /empty ruleset|Do not use empty rulesets/i, title: "这个选择器里面是空的",
    meaning: "选择器写了，大括号里没有任何声明。它不会产生效果。",
    look: "要么补上要改的属性，要么把这个空规则删掉，避免以后误以为它在起作用。",
    points: [
      { term: "规则集", text: "选择器加大括号，括号里才是真正要改的属性。括号是空的，就没有任何效果。" },
      { term: "删掉或补上", text: "不需要的空规则删掉。需要效果，就把属性写进大括号。" }
    ] },
  { lang: "CSS", name: "ruleset ignored due to bad selector", test: /ruleset ignored due to bad selector|invalid selector/i, title: "选择器写错了，整段被忽略",
    meaning: "选择器无法解析，所以后面的声明都不会生效。",
    look: "看选择器里的符号。类名前面是点，id 前面是 #。不要有多余的逗号，或没写完的伪类。",
    points: [
      { term: "选择器", text: "它决定这段样式用到哪些元素。选择器写坏了，后面的属性全部不会生效。" },
      { term: "点和井号", text: "类名前是 . ，id 前是 # 。漏掉符号，名字就会被当成标签。" }
    ] },
  { lang: "CSS", name: "{ expected", test: /\{ expected/, title: "选择器后面少了左大括号", needLang: true,
    meaning: "选择器写完，接下来应该用 { 开始一块声明。这里没有。",
    look: "在选择器后面补上 { ，声明写完再写 } 。不要把声明直接写在选择器后面。",
    points: [
      { term: "规则的形状", text: "先写选择器，再写 { ，里面是声明，最后写 } 。" },
      { term: "声明要放在括号里", text: "属性不能直接贴在选择器后面。它们属于大括号里面。" }
    ] },
  { lang: "CSS", name: "} expected", test: /\} expected/, title: "这一块少了右大括号", needLang: true,
    meaning: "一块样式开了头，还没有用 } 结束。",
    look: "看上一块的 { 有没有配对的 } 。漏掉时，后面的选择器会被当成还在这一块里面。",
    points: [
      { term: "大括号成对", text: "每一个 { 都要有一个 } 结束这一块样式。" },
      { term: "没关上会连带后面", text: "少一个右括号时，后面的规则可能全部跑进这一块，或者继续报语法错。" }
    ] }
];

(function () {
  var READ_POINTS = [
    { term: "类型名", text: "先找 xxxError、Exception，或 ERROR 加数字。那才是报错类型，不是整段英文都要翻译。" },
    { term: "行号", text: "文件名后面的数字，或 line 后面的数字，就是先打开的那一行。先看那一行，再决定改什么。" }
  ];

  function lastLine(text) {
    var lines = text.split(/\r?\n/).map(function (line) { return line.trim(); }).filter(Boolean);
    return lines.length ? lines[lines.length - 1] : "";
  }

  function locate(text, lang) {
    var found = {};
    var py = text.match(/File ["']([^"']+)["'], line (\d+)/);
    if (py) found.Python = py[1] + " 第 " + py[2] + " 行";
    var java = text.match(/([A-Za-z0-9_$.]+\.java):(\d+)/);
    if (java) found.Java = java[1] + " 第 " + java[2] + " 行";
    var js = text.match(/([A-Za-z0-9_$./\\-]+\.js):(\d+)/);
    if (js) found.JavaScript = js[1] + " 第 " + js[2] + " 行";
    var c = text.match(/([A-Za-z0-9_./\\-]+\.(?:c|cc|cpp|h|hpp)):(\d+)/);
    if (c) found["C/C++"] = c[1] + " 第 " + c[2] + " 行";
    var css = text.match(/([A-Za-z0-9_./\\-]+\.css):(\d+)/i);
    if (css) found.CSS = css[1] + " 第 " + css[2] + " 行";
    var html = text.match(/\bline (\d+)\b/i);
    if (html && (/<\/?[a-z!]/i.test(text) || /Stray end tag|Unclosed element|Duplicate ID|must have an|Bad value|Duplicate attribute|No space between attributes/i.test(text))) {
      found.HTML = "HTML 第 " + html[1] + " 行附近";
    }
    var sql = text.match(/\bat line (\d+)/i);
    if (sql) found.MySQL = "SQL 第 " + sql[1] + " 行附近";
    if (lang && found[lang]) return found[lang];
    return found.Python || found.Java || found.JavaScript || found["C/C++"] || found.CSS || found.HTML || found.MySQL || "";
  }

  function detect(text) {
    if (/Traceback \(most recent call last\)|File ["'][^"']+\.py["'], line \d+/.test(text)) return "Python";
    if (/object is not iterable|object is not subscriptable|object is not callable|unsupported operand|invalid literal for int|No module named |list index out of range|referenced before assignment|expected an indented block|unexpected indent|unindent does not match|division by zero|maximum recursion depth|positional argument|EOL while scanning|unexpected EOF while parsing|invalid syntax|JSONDecodeError|UnicodeDecodeError|UnicodeEncodeError/.test(text)) return "Python";
    if (/ERROR\s+\d{3,4}|SQLSTATE|You have an error in your SQL syntax|Access denied for user|Unknown database|Unknown column|Duplicate entry|Communications link failure|only_full_group_by|Subquery returns more than 1 row|in field list is ambiguous|doesn't have a default value|Incorrect datetime value|Out of range value|Cannot delete or update a parent row|Cannot add or update a child row|Can't connect to (?:local )?MySQL|SQLSyntaxErrorException/i.test(text)) return "MySQL";
    if (/\.(?:c|cc|cpp|h|hpp):\d+|undefined reference to |Segmentation fault|error: stray\s+['‘’\\]|was not declared in this scope|undeclared identifier|redefinition of |control reaches end of non-void|invalid conversion|too (?:few|many) arguments/i.test(text)) return "C/C++";
    if (/Stray end tag|Unclosed element|not allowed as child of element|Duplicate ID|must have an\s+\W*alt|Bad value\b|there were open elements|there were unclosed elements|Duplicate attribute|No space between attributes|expecting an attribute name|Attribute name expected|Quote expected|htmlhint/i.test(text)) return "HTML";
    if (/\.css:\d+|unknown property|Invalid property value|Error in parsing value for |at-rule or selector expected|semi-colon expected|semicolon expected|(?<!semi-?)colon expected|property value expected|empty ruleset|bad selector/i.test(text)) return "CSS";
    if (/npm ERR!|EADDRINUSE|ERR_MODULE_NOT_FOUND|Cannot find module |Cannot read propert|Cannot set propert|ReferenceError:|is not a function|is not iterable|await is only valid|Unexpected end of JSON|Unexpected end of input|Unexpected token|Unexpected identifier|node:internal|\.js:\d+:\d+|Assignment to constant variable|Missing initializer in const|has already been declared/i.test(text)) return "JavaScript";
    if (/\.java:\d+|Exception in thread |cannot find symbol|UnsupportedClassVersionError|non-static method |cannot be applied to given types|cannot be dereferenced|possible lossy conversion|Could not find or load main class|illegal start of expression|illegal start of type|unclosed string literal|might not have been initialized|unreported exception|reached end of file while parsing|';' expected|'\}' expected|'\)' expected|'\]' expected|bad operand types|array required, but |is already defined|should be declared in a file named|NullPointerException|ArrayIndexOutOfBoundsException|StringIndexOutOfBoundsException|IndexOutOfBoundsException|NegativeArraySizeException|NumberFormatException|ArithmeticException|ClassCastException|FileNotFoundException|ClassNotFoundException|NoClassDefFoundError|NoSuchElementException|InputMismatchException|ConcurrentModificationException|StackOverflowError|'else' without 'if'|not a statement|illegal character|'void' type not allowed here|void cannot be converted/.test(text)) return "Java";
    if (/^(?:IndentationError|TabError|NameError|UnboundLocalError|ValueError|IndexError|KeyError|AttributeError|ModuleNotFoundError|ImportError|FileNotFoundError|ZeroDivisionError|RecursionError|PermissionError|ConnectionRefusedError|IsADirectoryError|NotADirectoryError|EOFError):/m.test(text)) return "Python";
    return "";
  }

  function prefer(candidate, current) {
    if (candidate.rank !== current.rank) return candidate.rank > current.rank;
    if (candidate.len !== current.len) return candidate.len > current.len;
    if (candidate.at !== current.at) return candidate.at < current.at;
    return candidate.index < current.index;
  }

  function collect(text, options) {
    var lang = options.lang || "";
    var skipLang = options.skipLang || "";
    var allowGeneric = !!options.allowGeneric;
    var map = {};
    window.ERROR_RULES.forEach(function (rule, index) {
      if (lang && rule.lang !== lang) return;
      if (skipLang && rule.lang === skipLang) return;
      if (!allowGeneric && rule.needLang) return;
      if (!rule.test.test(text)) return;
      var at = text.toLowerCase().indexOf(rule.name.toLowerCase());
      var candidate = {
        rule: rule,
        index: index,
        at: at < 0 ? 1e9 : at,
        len: rule.name.length,
        rank: rule.rank || 1
      };
      if (!map[rule.lang] || prefer(candidate, map[rule.lang])) map[rule.lang] = candidate;
    });
    return map;
  }

  function only(map) {
    var keys = Object.keys(map);
    if (keys.length !== 1) return null;
    return map[keys[0]].rule;
  }

  function evidence(rule, text) {
    if (text.toLowerCase().indexOf(rule.name.toLowerCase()) >= 0) {
      return "这段原文里出现了「" + rule.name + "」，所以可以确定。";
    }
    return "这段原文对上了「" + rule.title + "」，可以确定。";
  }

  function finish(kind, rule, text, tail, note) {
    var spot = locate(text, rule.lang);
    return {
      kind: kind,
      lang: rule.lang,
      tagClass: kind === "warn" ? "warn" : "ok",
      tag: kind === "warn" ? "语言可能选错了" : rule.lang + " · 对上了",
      title: kind === "warn" ? rule.lang + "：" + rule.title : rule.title,
      where: [spot, note].filter(Boolean).join(" · "),
      meaning: rule.meaning,
      look: rule.look,
      raw: tail,
      points: rule.points || []
    };
  }

  function unknown(spot, tail, meaning) {
    return {
      kind: "unknown",
      lang: "",
      tagClass: "warn",
      tag: "不猜",
      title: "这条没有对上已知的报错",
      where: spot,
      meaning: meaning,
      look: "请看下面这一行。它通常是原因本身。把其中的英文类型名记下来，再对回它指出的文件和行号。",
      raw: tail,
      points: READ_POINTS
    };
  }

  function explain(text, chosen) {
    var rawText = String(text || "").trim();
    var tail = lastLine(rawText);
    var spot = locate(rawText);
    if (!rawText) {
      return {
        kind: "empty",
        lang: "",
        tagClass: "warn",
        tag: "还没有报错",
        title: "先贴内容",
        where: "",
        meaning: "上面的框是空的。",
        look: "从红色的第一行开始贴，整段都可以。",
        raw: "",
        points: [
          { term: "贴整段", text: "从第一行贴到最后一行。只贴半句时，经常对不上，这里也不会替你猜一个原因。" }
        ]
      };
    }

    var guessed = detect(rawText);
    var useLang = chosen && chosen !== "auto" ? chosen : "";

    if (useLang && guessed && guessed !== useLang) {
      var other = only(collect(rawText, { lang: guessed, allowGeneric: true }));
      if (other) {
        var why = "你选了 " + useLang + "，但这段更像 " + guessed + "。为避免讲错，这里改按 " + guessed + " 解释。";
        return finish("warn", other, rawText, tail, why);
      }
    }

    if (useLang) {
      var own = only(collect(rawText, { lang: useLang, allowGeneric: true }));
      if (own) return finish("hit", own, rawText, tail, evidence(own, rawText));
      return unknown(spot, tail, "在你选的语言里没有对上已知类型。原文里也没有足够的特征改判成别的语言。与其讲错，这里不猜。");
    }

    if (guessed) {
      var hit = only(collect(rawText, { lang: guessed, allowGeneric: true }));
      if (hit) return finish("hit", hit, rawText, tail, evidence(hit, rawText));
      var rest = collect(rawText, { allowGeneric: false, skipLang: guessed });
      var restKeys = Object.keys(rest);
      if (restKeys.length === 1) return finish("hit", rest[restKeys[0]].rule, rawText, tail, evidence(rest[restKeys[0]].rule, rawText));
      if (restKeys.length > 1) {
        return unknown(spot, tail, "这段同时像 " + restKeys.join("、") + "。为避免讲错，这里不选一种来解释。");
      }
      return unknown(spot, tail, "原文里没有出现本工具认识的那种明确类型。与其讲错，这里不给一个可能错误的原因。");
    }

    var map = collect(rawText, { allowGeneric: false });
    var keys = Object.keys(map);
    if (keys.length === 1) return finish("hit", map[keys[0]].rule, rawText, tail, evidence(map[keys[0]].rule, rawText));
    if (keys.length > 1) {
      return unknown(spot, tail, "这段同时像 " + keys.join("、") + "。为避免讲错，这里不选一种来解释。");
    }
    return unknown(spot, tail, "原文里没有出现本工具认识的那种明确类型。与其讲错，这里不给一个可能错误的原因。");
  }

  window.ERROR_TOOL = { detect: detect, locate: locate, explain: explain };
})();
