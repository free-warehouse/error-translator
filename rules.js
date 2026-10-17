window.ERROR_LANGS = ["HTML", "CSS", "JavaScript", "MySQL", "Java", "Python", "C/C++"];

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
  { lang: "Java", name: "IndexOutOfBoundsException", test: /(?<!Array|String)IndexOutOfBoundsException/, title: "列表下标越界",
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
  { lang: "Python", name: "SyntaxError", test: /SyntaxError(?!.*[Uu]nexpected)/, title: "这行语法不完整", needLang: true,
    meaning: "解释器没法把这行读成一句 Python。常见是括号、引号、冒号少了一边。",
    look: "看报错标出的行，再看上一行。if、for、def、class 的下一行要缩进，行尾通常要有冒号。",
    points: [
      { term: "冒号", text: "if、for、while、def、class 的行尾要有冒号，下一行再缩进。" },
      { term: "看上一行", text: "标出来的位置，有时是下一行。漏掉的括号或冒号常常在它上面。" }
    ] },
  { lang: "Python", name: "NameError", test: /NameError/, title: "这个名字还不存在",
    meaning: "你使用的名字还不存在。没加引号的文字也会被当成名字，例如 print(你好)。",
    look: "看引号里的名字。往上搜索同名赋值。函数里的名字外面看不见，外面的名字函数里要用参数传进来。",
    points: [
      { term: "先赋值再使用", text: "Python 里没有单独的声明。名字第一次出现，通常就该是赋值。" },
      { term: "引号", text: "想当文字用的内容要放进引号。没有引号时，中文也会被当成变量名。" }
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
  { lang: "Python", name: "TypeError", test: /TypeError(?!.*(?:Cannot read propert|Cannot set propert|is not a function|is not iterable|is not a constructor|before initialization))/, title: "类型不能这样用", needLang: true,
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
  { lang: "Python", name: "ModuleNotFoundError", test: /ModuleNotFoundError|No module named /, title: "找不到这个模块", rank: 2,
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
  { lang: "JavaScript", name: "is not a function", test: /is not a function(?! or function pointer)/, title: "这不是一个函数",
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
  { lang: "JavaScript", name: "Unexpected end of JSON", test: /Unexpected end of JSON|is not valid JSON/i, title: "这段文字不是合法的 JSON", rank: 2,
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
  { lang: "JavaScript", name: "is not iterable", test: /(?<!object )(?<!['"] )is not iterable/, title: "这个值不能被遍历",
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
  { lang: "CSS", name: "colon expected", test: /(?<!semi-?)colon expected/i, title: "属性和值之间少了冒号",
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
    ] },
{ lang: "Java", name: "IOException", test: /IOException/, title: "读写文件或流失败",
    meaning: "读文件、写文件或网络相关操作失败了。文件可能不存在，也可能没有权限。",
    look: "看是读还是写。路径对不对，文件是否真的在，程序有没有权限。",
    points: [
      { term: "IO", text: "输入输出。程序和文件、网络打交道时，外面的环境可能失败。" },
      { term: "检查异常", text: "IOException 通常要 try-catch，或在方法上声明 throws。" }
    ] },
  { lang: "Java", name: "IllegalArgumentException", test: /IllegalArgumentException/, title: "参数不合法",
    meaning: "传给方法的参数不符合要求。例如负数、空字符串、超出范围。",
    look: "看是哪个方法抛出的，再看你传入的值。对照方法文档里对参数的要求。",
    points: [
      { term: "参数检查", text: "方法可以拒绝不合理的输入。被拒绝时，先改传入的值。" },
      { term: "边界", text: "0、负数、空串、null 常常是边界。先确认这些情况是不是被禁止的。" }
    ] },
  { lang: "Java", name: "IllegalStateException", test: /IllegalStateException/, title: "当前状态不允许这样做",
    meaning: "对象还没准备好，或者已经处于不能再执行这个操作的状态。",
    look: "看调用顺序。是不是还没初始化就用了，或已经关闭/结束了还在用。",
    points: [
      { term: "状态", text: "有的对象要先 open、先 start，才能做下一步。顺序反了会报这个。" },
      { term: "生命周期", text: "关闭或结束后，不要再对它调用业务方法。" }
    ] },
  { lang: "Java", name: "UnsupportedOperationException", test: /UnsupportedOperationException/, title: "这个操作不被支持",
    meaning: "这个对象表面上有这个方法，但实际实现不允许这么做。",
    look: "常见是对 Arrays.asList 得到的列表做 add/remove，或对不可变集合修改。",
    points: [
      { term: "不可变集合", text: "有的列表只是固定视图，不能增删。要改内容，先 new 一个真正的 ArrayList。" },
      { term: "接口和实现", text: "接口写了方法，不代表每一种实现都支持。看你手里到底是哪种对象。" }
    ] },
  { lang: "Java", name: "OutOfMemoryError", test: /OutOfMemoryError/, title: "内存不够了",
    meaning: "程序申请的内存超过了虚拟机能给的上限。",
    look: "看是不是一次创建了过大的数组，或集合一直增长没有释放。",
    points: [
      { term: "堆内存", text: "对象主要住在堆里。堆满了，再 new 就会失败。" },
      { term: "别一次装太大", text: "读大文件时不要一次全部读进内存。能分段处理就分段。" }
    ] },
  { lang: "Java", name: "identifier expected", test: /identifier expected/, title: "这里应该是一个名字",
    meaning: "编译器在这里期待变量名、方法名或类名，却看到了别的符号。",
    look: "看标出的位置前后。是不是多了逗号、少了名字，或把关键字当成了名字。",
    points: [
      { term: "标识符", text: "变量、方法、类的名字就是标识符。这里缺的是一个合法名字。" },
      { term: "别用关键字当名字", text: "class、int、return 这些词有特殊含义，不能拿来当变量名。" }
    ] },
  { lang: "Java", name: "class, interface, or enum expected", test: /class, interface, or enum expected/, title: "这里应该是类、接口或枚举",
    meaning: "代码写到了类外面不该出现的位置，或大括号已经提前结束了。",
    look: "从文件开头检查大括号是否成对。方法必须写在类里面。",
    points: [
      { term: "类是外壳", text: "Java 的方法和字段要放在 class 里面，不能直接写在文件最外层。" },
      { term: "大括号提前结束", text: "类的 } 写早了，后面的方法就会落在类外面，编译器就会这样报。" }
    ] },
  { lang: "Java", name: "unreachable statement", test: /unreachable statement/, title: "这行代码永远执行不到",
    meaning: "前面已经 return、break、continue 或抛出异常了，后面的语句不会被执行。",
    look: "看这一行前面是不是已经结束了当前分支。删掉多余的，或调整顺序。",
    points: [
      { term: "return 之后", text: "return 一写，这个方法在这条路上就结束了。后面再写普通语句没有意义。" },
      { term: "死代码", text: "编译器发现永远到不了的代码，会直接报错，逼你把它清掉或改结构。" }
    ] },
  { lang: "Java", name: "cannot assign a value to final variable", test: /cannot assign a value to final variable/, title: "final 变量不能再赋值",
    meaning: "被 final 修饰的变量只能赋一次值，你又赋了一次。",
    look: "搜索这个变量。要么去掉后面的赋值，要么不要用 final。",
    points: [
      { term: "final", text: "表示这个名字绑定的值不要再改。适合常量或只赋值一次的变量。" },
      { term: "要改就别 final", text: "后面还要改值的变量，用普通声明，不要加 final。" }
    ] },
  { lang: "Java", name: "method does not override or implement", test: /method does not override or implement/, title: "这个方法并没有覆盖到父类方法",
    meaning: "你加了 @Override，但父类或接口里没有同名同参数的方法可覆盖。",
    look: "对照父类方法名、参数类型、返回值。拼写差一个字母也不算覆盖。",
    points: [
      { term: "@Override", text: "用来声明「我要覆盖父类方法」。对不上时，编译器会拦下来。" },
      { term: "签名一致", text: "方法名和参数类型都要和父类一致。只改返回值或参数顺序，不算同一种方法。" }
    ] },
  { lang: "Java", name: "is abstract; cannot be instantiated", test: /is abstract; cannot be instantiated|abstract.*cannot be instantiated/, title: "抽象类不能直接 new",
    meaning: "抽象类或接口不能直接创建对象，要 new 它的具体子类。",
    look: "看你 new 的是不是 abstract class 或 interface。改成 new 实现类。",
    points: [
      { term: "抽象类", text: "它只规定一部分能力，本身不完整，所以不能直接 new。" },
      { term: "实现类", text: "要创建对象，new 那个把抽象方法都实现完的子类。" }
    ] },
  { lang: "Java", name: "The method foo is undefined", test: /The method .+ is undefined|cannot find symbol\s*method/i, title: "这个方法不存在",
    meaning: "你调用的方法，在这个类型上看不到。可能是拼写错了，或类型不对。",
    look: "看点号左边的类型，以及方法名拼写。确认这个类里真的有这个方法。",
    points: [
      { term: "类型决定方法", text: "a.b() 能不能调用，看 a 的类型里有没有 b。" },
      { term: "拼写", text: "大小写和字母都要对。length 和 Length 不是同一个方法。" }
    ] },
  { lang: "Java", name: "variable x is already defined", test: /variable .+ is already defined/, title: "这个变量已经声明过了", rank: 2,
    meaning: "同一个方法或同一块里，这个变量名又声明了一次。",
    look: "搜索这个变量名。留下一处声明，后面只赋值。",
    points: [
      { term: "一块里一次", text: "同一对大括号里，不要把同一个变量名声明两次。" },
      { term: "赋值不用再写类型", text: "第一次写 int n = 1。后面改值只写 n = 2。" }
    ] },
  { lang: "Java", name: "orphaned case", test: /orphaned case/, title: "case 没有落在 switch 里",
    meaning: "case 或 default 写到了 switch 外面，或者 switch 的大括号已经结束了。",
    look: "确认 case 都在 switch (...) { } 里面。",
    points: [
      { term: "switch 结构", text: "case 只能写在 switch 的大括号里。" },
      { term: "括号范围", text: "switch 的 } 写早了，后面的 case 就会变成孤儿。" }
    ] },
  { lang: "Java", name: "incompatible types: possible lossy", test: /incompatible types: possible lossy/, title: "赋值会丢掉精度", rank: 2,
    meaning: "把更大范围的数字赋给更小的类型时，编译器要求你明确确认。",
    look: "看两边类型。确定要截断时写成显式转换，例如 (int) x。",
    points: [
      { term: "精度丢失", text: "double 赋给 int，小数部分会丢掉。编译器要你明确写出转换。" },
      { term: "显式转换", text: "写成 (int) 那个数，表示你知道并接受这种截断。" }
    ] },
{ lang: "Python", name: "AssertionError", test: /AssertionError/, title: "断言失败了",
    meaning: "assert 后面的条件为假。你设定的「必须成立」没有成立。",
    look: "看 assert 后面的条件，以及失败时附带的说明文字。",
    points: [
      { term: "assert", text: "用来检查「这里必须为真」。为假时程序停下来，提醒你假设破了。" },
      { term: "调试用", text: "断言适合抓程序员假设错误。它不是给用户看的普通错误提示。" }
    ] },
  { lang: "Python", name: "StopIteration", test: /StopIteration/, title: "迭代已经结束了",
    meaning: "还在向迭代器要下一个值，但已经没有了。",
    look: "看是不是手动调用了 next() 却没有处理结束。用 for 循环通常不会直接看到它。",
    points: [
      { term: "迭代器", text: "它一次给出一个值。取完以后再取，就会 StopIteration。" },
      { term: "for 更安全", text: "普通遍历用 for。它会在结束时自动停，不必自己抓 StopIteration。" }
    ] },
  { lang: "Python", name: "RuntimeError", test: /RuntimeError/, title: "运行时出了问题",
    meaning: "程序在运行中遇到了不属于更具体类型的错误。",
    look: "先读完整英文说明。很多 RuntimeError 后面会写真正原因。",
    points: [
      { term: "运行时", text: "语法已经通过了，执行到某一句时才失败。" },
      { term: "看说明文字", text: "RuntimeError 很宽。真正有用的信息通常在冒号后面那句英文。" }
    ] },
  { lang: "Python", name: "MemoryError", test: /\bMemoryError\b/, title: "内存不够了",
    meaning: "这次操作需要的内存，超过了当前能提供的量。",
    look: "看是不是一次创建了超大列表，或把整个大文件读进内存。",
    points: [
      { term: "别一次装完", text: "大文件、大数据要分段处理，不要一次性全部放进列表。" },
      { term: "对象会占内存", text: "列表、字典、图片都占内存。越大、越多，越容易顶满。" }
    ] },
  { lang: "Python", name: "TimeoutError", test: /TimeoutError/, title: "等待超时了",
    meaning: "在限定时间内没有等到结果，常见于网络或阻塞操作。",
    look: "看连接的地址和服务是否可达。超时时间是否太短。",
    points: [
      { term: "超时", text: "不是永远等下去。到点还没成功，就按失败处理。" },
      { term: "网络常见", text: "对方太慢、不通，或本机网络有问题时，容易等到超时。" }
    ] },
  { lang: "Python", name: "OSError", test: /OSError/, title: "系统和文件操作失败了",
    meaning: "操作系统拒绝了这次操作。路径、权限或资源状态不对。",
    look: "看 Errno 和后面的路径说明。先确认路径存在，再确认有权限。",
    points: [
      { term: "系统调用", text: "打开文件、建目录、改名字，都要经过操作系统。失败就变成 OSError。" },
      { term: "更具体的子类", text: "FileNotFoundError、PermissionError 也是 OSError 的一种。能对上更具体的，就看更具体的。" }
    ] },
  { lang: "Python", name: "invalid literal for int", test: /invalid literal for int/, title: "这段文字变不成整数", rank: 2,
    meaning: "int(...) 收到的内容不是合法整数写法。",
    look: "看引号里的文字。空串、小数点、字母都会失败。先 strip，再确认全是数字。",
    points: [
      { term: "int()", text: "只接受像 42、-3 这样的整数字符串。3.14 或 abc 都会失败。" },
      { term: "先清理输入", text: "用户输入常有空格。先 strip，再转换成 int。" }
    ] },
  { lang: "Python", name: "can only concatenate", test: /can only concatenate/, title: "字符串和数字不能直接拼", rank: 2,
    meaning: "用 + 拼接时，两边类型不一致。常见是字符串加数字。",
    look: "看 + 两边。数字要先 str(...)，或字符串要先变成数字再算。",
    points: [
      { term: "同类型才能 +", text: "字符串加字符串，数字加数字。混在一起要用转换。" },
      { term: "str()", text: "想把数字拼进句子里，先写成 str(数字)。" }
    ] },
  { lang: "Python", name: "unexpected keyword argument", test: /got an unexpected keyword argument|unexpected keyword argument/, title: "多传了一个关键字参数", rank: 2,
    meaning: "函数没有名叫这个的参数，你却用 名字=值 的方式传进去了。",
    look: "看关键字名字拼写。对照函数定义里的参数列表。",
    points: [
      { term: "关键字参数", text: "调用时写成 f(x=1)，这里的 x 必须是函数定义里有的参数名。" },
      { term: "拼写", text: "参数名差一个字母就不算同一个。对照定义，不要凭感觉写。" }
    ] },
  { lang: "Python", name: "missing 1 required positional argument", test: /missing \d+ required positional argument/, title: "少传了必要参数", rank: 2,
    meaning: "函数还需要更多位置参数，你没有给够。",
    look: "对照函数定义，看还缺哪几个参数，在调用处补上。",
    points: [
      { term: "必要参数", text: "定义里没有默认值的参数，调用时必须提供。" },
      { term: "对一下定义", text: "先打开函数那一行，按参数顺序把调用补齐。" }
    ] },
  { lang: "Python", name: "not enough values to unpack", test: /not enough values to unpack/, title: "拆包时右边的值不够", rank: 2,
    meaning: "左边要接的变量比右边能提供的值多。",
    look: "看左边有几个名字，右边实际有几个值。让两边数量一致。",
    points: [
      { term: "拆包", text: "a, b = 右边 表示右边要正好能拆成两个值。" },
      { term: "数量一致", text: "左边几个名字，右边就要几个值。少了就拆不开。" }
    ] },
  { lang: "Python", name: "too many values to unpack", test: /too many values to unpack/, title: "拆包时右边的值太多", rank: 2,
    meaning: "右边的值比左边的变量多，装不下。",
    look: "减少右边，或在左边增加变量，或用 *rest 收下多余的。",
    points: [
      { term: "一一对应", text: "拆包要求左右数量匹配。多出来的值没有变量可接。" },
      { term: "先打印右边", text: "不确定右边有几个时，先 print 再决定左边写几个名字。" }
    ] },
  { lang: "Python", name: "cannot unpack non-iterable", test: /cannot unpack non-iterable/, title: "这个值不能拆包", rank: 2,
    meaning: "你想拆成多个变量，但它不是可迭代对象。",
    look: "看右边是不是 None 或一个普通数字。只有列表、元组这类才能拆。",
    points: [
      { term: "可迭代", text: "列表、元组、字符串可以一个个取出。单个整数不行。" },
      { term: "None", text: "右边如果是 None，说明前面的函数没有返回可拆的值。" }
    ] },
  { lang: "Python", name: "unterminated string literal", test: /unterminated string literal/, title: "字符串没有结束", rank: 2,
    meaning: "引号开了头，没有在正确位置关上。",
    look: "看这一行的引号是否成对。跨多行要用三引号。",
    points: [
      { term: "引号成对", text: "单引号开的要用单引号关，双引号同理。" },
      { term: "三引号", text: "字符串要跨很多行时，用三个单引号或三个双引号包起来。" }
    ] },
  { lang: "Python", name: "expected ':'", test: /expected ':'/, title: "这里少了冒号", rank: 2,
    meaning: "if、for、def、class 这类语句末尾需要冒号。",
    look: "看这一行末尾。补上英文冒号，下一行再缩进写内容。",
    points: [
      { term: "冒号开头块", text: "Python 用冒号表示「下面缩进的是属于我的块」。" },
      { term: "英文冒号", text: "要用 :，不要用中文冒号。" }
    ] },
  { lang: "Python", name: "does not support item assignment", test: /does not support item assignment/, title: "这个对象不能用下标赋值", rank: 2,
    meaning: "你对字符串或元组做了 s[0] = ... 这类修改。它们不能就地改。",
    look: "字符串要拼出新的；需要可改序列时用 list。",
    points: [
      { term: "不可变", text: "字符串和元组创建后不能改其中某一格。要改就生成新的。" },
      { term: "列表可以改", text: "需要改某个位置时，用 list，不要用 tuple 或 str。" }
    ] },
  { lang: "Python", name: "dictionary changed size during iteration", test: /dictionary changed size during iteration/, title: "遍历字典时改了它的大小", rank: 2,
    meaning: "一边 for 遍历字典，一边增加或删除键。",
    look: "先 list(d) 或先收集要删的键，循环结束后再改。",
    points: [
      { term: "遍历中别改大小", text: "正在 for 的字典，不要在循环里增删键。" },
      { term: "先拷贝键", text: "for k in list(d): 再在循环里删，这样更安全。" }
    ] },
{ lang: "MySQL", name: "Duplicate column name", test: /ERROR\s+1060|Duplicate column name/i, title: "列名重复了",
    meaning: "建表或改表时，同一个列名出现了两次。",
    look: "检查 CREATE TABLE 或 ALTER TABLE 里的列名，去掉重复的。",
    points: [
      { term: "列名唯一", text: "一张表里，每个列名只能出现一次。" },
      { term: "改表也算", text: "ADD COLUMN 时如果表里已有同名列，也会报重复。" }
    ] },
  { lang: "MySQL", name: "Duplicate key name", test: /ERROR\s+1061|Duplicate key name/i, title: "索引名重复了",
    meaning: "这个索引名字在表里已经存在。",
    look: "换一个索引名，或先删掉旧索引再创建。",
    points: [
      { term: "索引名", text: "同一张表里，索引名字不能撞车。" },
      { term: "先查再建", text: "不确定有没有时，先看表结构，再决定创建还是重建。" }
    ] },
  { lang: "MySQL", name: "You can't specify target table", test: /ERROR\s+1093|You can't specify target table/i, title: "不能在子查询里更新同一张表",
    meaning: "UPDATE/DELETE 的目标表，又出现在同句的子查询里，MySQL 不允许这种写法。",
    look: "把子查询结果先装进临时表或派生表，再更新。",
    points: [
      { term: "同表限制", text: "要改的表，不能同时又在子查询里读自己来决定改谁。" },
      { term: "拆成两步", text: "先查出 id 列表，再按 id 更新，思路更清楚，也常能绕开限制。" }
    ] },
  { lang: "MySQL", name: "safe update mode", test: /ERROR\s+1175|safe update/i, title: "安全更新模式拦住了",
    meaning: "开启了安全更新时，UPDATE/DELETE 必须带键条件或 LIMIT，防止误改全表。",
    look: "加上 WHERE 主键条件，或按需要暂时关闭安全更新。先确认不会误伤全表。",
    points: [
      { term: "安全更新", text: "用来防止忘记写 WHERE 就把整表改掉或删掉。" },
      { term: "带上键条件", text: "WHERE 里用上主键或索引列，通常就能通过检查。" }
    ] },
  { lang: "MySQL", name: "Cannot add foreign key constraint", test: /ERROR\s+1215|Cannot add foreign key constraint/i, title: "外键加不上",
    meaning: "外键约束建立失败。两边类型不一致，或被引用的键不是主键/唯一键。",
    look: "对照两列的类型、长度、符号。被引用列必须是主键或唯一索引。",
    points: [
      { term: "外键", text: "子表的值必须在父表里找得到。建立约束时，两边规则必须对得上。" },
      { term: "类型一致", text: "int 和 bigint、有无符号不一致时，外键常常加失败。" }
    ] },
  { lang: "MySQL", name: "Lost connection to MySQL server", test: /ERROR\s+2013|Lost connection to MySQL server/i, title: "和 MySQL 的连接丢失了",
    meaning: "查询过程中连接断了。可能是超时、包太大，或服务器重启。",
    look: "看是不是一次传了过大的数据。先重连，再考虑拆小语句。",
    points: [
      { term: "连接会断", text: "网络不稳、服务器重启、超时，都会让连接丢失。" },
      { term: "大包", text: "一次插入过大内容时，可能超过 max_allowed_packet。" }
    ] },
  { lang: "MySQL", name: "Lock wait timeout exceeded", test: /Lock wait timeout exceeded/i, title: "等锁超时了",
    meaning: "这条语句在等别的事务放开锁，等到超时仍没轮到。",
    look: "看是否有长时间未提交的事务占用了同一行。先提交或回滚卡住的那边。",
    points: [
      { term: "锁", text: "一行正在被别的事务改时，你可能要等。等太久就超时。" },
      { term: "事务别挂太久", text: "事务开启后尽快做完并提交，不要开着事务去干别的事。" }
    ] },
  { lang: "MySQL", name: "Deadlock found when trying to get lock", test: /Deadlock found when trying to get lock/i, title: "发生了死锁",
    meaning: "两个事务互相等待对方放手，数据库拆掉其中一个。",
    look: "看被回滚的事务。调整加锁顺序，或缩小事务范围后重试。",
    points: [
      { term: "死锁", text: "A 等 B，B 等 A，两边都走不下去。数据库会牺牲其中一个。" },
      { term: "重试", text: "被回滚的那一方通常可以重新执行一遍事务。" }
    ] },
  { lang: "MySQL", name: "Unknown table", test: /ERROR\s+1051|Unknown table/i, title: "没有这张表",
    meaning: "语句里用到的表名，当前库中不存在。",
    look: "确认库是否选对，表名是否拼错，是否区分大小写。",
    points: [
      { term: "先 USE 库", text: "表属于某个数据库。没选对库时，会觉得表不存在。" },
      { term: "拼写", text: "表名差一个字母就不对。和 SHOW TABLES 对照一下。" }
    ] },
  { lang: "MySQL", name: "Every derived table must have its own alias", test: /Every derived table must have its own alias/i, title: "派生表必须起别名",
    meaning: "FROM 后面的子查询结果必须写成派生表，并给它一个别名。",
    look: "在子查询右括号后写 AS 名字，例如 ) AS t。",
    points: [
      { term: "派生表", text: "把子查询的结果临时当成一张表来用，这张表必须有名字。" },
      { term: "AS 别名", text: "写法是 FROM (子查询) AS t。没有 AS t 就会报这个错。" }
    ] },
  { lang: "MySQL", name: "Operand should contain 1 column", test: /Operand should contain 1 column/i, title: "这里只能有一列",
    meaning: "子查询或表达式在这个位置只允许返回一列，你返回了多列。",
    look: "把子查询的 SELECT 列表改成只要那一列。",
    points: [
      { term: "单列子查询", text: "用在 =、IN 一侧时，子查询常常只能选出一列。" },
      { term: "只选需要的列", text: "不要 SELECT *。明确写出那一个列名。" }
    ] },
  { lang: "MySQL", name: "Illegal mix of collations", test: /Illegal mix of collations/i, title: "字符集校对规则混用了",
    meaning: "参与比较或连接的字符串，校对规则不一致。",
    look: "统一列的 COLLATE，或在比较时显式指定同一种校对规则。",
    points: [
      { term: "校对规则", text: "它决定字符串怎么比较大小写和重音。两边规则不同就不能直接比。" },
      { term: "统一", text: "同一库尽量用同一种字符集和校对规则，少很多麻烦。" }
    ] },
{ lang: "JavaScript", name: "Maximum call stack size exceeded", test: /Maximum call stack size exceeded/, title: "递归或互相调用没有停",
    meaning: "函数一层层调用自己，栈被撑满了。常见是递归没有结束条件。",
    look: "看哪个函数反复出现在调用栈里。补上结束条件，或去掉意外的自调用。",
    points: [
      { term: "调用栈", text: "每调用一次函数就占一层。层数太多，引擎就会停下来。" },
      { term: "结束条件", text: "递归必须有走到尽头的分支。没有尽头就会一直调用自己。" }
    ] },
  { lang: "JavaScript", name: "Invalid array length", test: /Invalid array length/, title: "数组长度不合法",
    meaning: "你把数组长度设成了负数，或设成了过大的数。",
    look: "看 new Array(n) 或 arr.length = n 里的 n。它必须是合法的正整数长度。",
    points: [
      { term: "length", text: "数组长度不能是负数，也不能大到引擎无法接受。" },
      { term: "别用小数", text: "长度应当是整数。算出小数时先取整，并确认不是负数。" }
    ] },
  { lang: "JavaScript", name: "is not a constructor", test: /is not a constructor/, title: "这个值不能用 new 调用",
    meaning: "你对一个不是构造函数的值使用了 new。",
    look: "看 new 后面的名字。普通对象、箭头函数、或返回值搞错时都会这样。",
    points: [
      { term: "new", text: "new 只能用在构造函数或 class 上。普通函数或对象不行。" },
      { term: "箭头函数", text: "箭头函数不能当构造函数。要 new，就用 function 或 class。" }
    ] },
  { lang: "JavaScript", name: "Cannot convert undefined or null to object", test: /Cannot convert undefined or null to object/, title: "不能把空值当成对象来用",
    meaning: "Object.keys、展开运算等需要对象，你却给了 null 或 undefined。",
    look: "先判断值是不是对象，再调用 Object 的方法。",
    points: [
      { term: "需要对象", text: "有些 API 只接受对象。空值没有键可枚举。" },
      { term: "先判断", text: "if (obj) 或更严格的类型判断之后，再去做 Object.keys。" }
    ] },
  { lang: "JavaScript", name: "Cannot create property", test: /Cannot create property/, title: "不能在这个值上创建属性",
    meaning: "你想给 null、undefined 或冻结的对象添加属性。",
    look: "确认左边先是一个普通对象。不要对空值写 obj.x = 1。",
    points: [
      { term: "先有对象", text: "属性必须挂在对象上。左边是空的，就无处可挂。" },
      { term: "冻结对象", text: "被 Object.freeze 的对象也不能再加新属性。" }
    ] },
  { lang: "JavaScript", name: "Cannot destructure property", test: /Cannot destructure property/, title: "解构失败了",
    meaning: "你想从对象里取出属性，但右边是 null 或 undefined。",
    look: "给右边默认值，或先判断再解构。",
    points: [
      { term: "解构", text: "const { a } = obj 要求 obj 是对象。obj 是空就会失败。" },
      { term: "默认值", text: "可以写成 const { a } = obj || {}，避免空值直接解构。" }
    ] },
  { lang: "JavaScript", name: "Invalid left-hand side in assignment", test: /Invalid left-hand side in assignment/, title: "等号左边不能被赋值",
    meaning: "赋值语句的左边不是变量或属性，而是一个不能装值的东西。",
    look: "看是不是写成了 == 却只想比较，或把函数调用、字面量放在了左边。",
    points: [
      { term: "左边要能装值", text: "变量、对象属性可以在左边。数字、字符串字面量不能。" },
      { term: "比较用 ===", text: "只是比较相等时用 ===，不要误写成赋值。" }
    ] },
  { lang: "JavaScript", name: "Missing catch or finally after try", test: /Missing catch or finally after try/, title: "try 后面少了 catch 或 finally",
    meaning: "写了 try，但既没有 catch，也没有 finally。",
    look: "补上 catch (e) { ... }，或 finally { ... }。",
    points: [
      { term: "try 的伙伴", text: "try 必须搭配 catch 或 finally，否则语法不完整。" },
      { term: "catch 处理错误", text: "出错时进 catch。不论成败都要做的清理，放进 finally。" }
    ] },
  { lang: "JavaScript", name: "Invalid or unexpected token", test: /Invalid or unexpected token/, title: "这里有非法或意外的符号",
    meaning: "出现了引擎不认识的字符，或符号放错了位置。常见是中文标点。",
    look: "看标出附近的引号、括号、逗号。把中文符号换成英文。",
    points: [
      { term: "token", text: "引擎把代码拆成的最小符号单元。非法 token 就是某一处符号不对。" },
      { term: "中文标点", text: "中文逗号、引号、分号是常见元凶。改成英文半角再试。" }
    ] },
  { lang: "JavaScript", name: "Converting circular structure to JSON", test: /Converting circular structure to JSON/, title: "对象有循环引用，不能转 JSON",
    meaning: "对象里绕回了自己，JSON.stringify 无法表示这种结构。",
    look: "去掉循环引用，或只挑选需要的字段再 stringify。",
    points: [
      { term: "循环引用", text: "a.b = a 这种结构，JSON 文本表达不出来。" },
      { term: "只留需要的", text: "转 JSON 前先整理成没有环的普通数据。" }
    ] },
  { lang: "JavaScript", name: "Unhandled Promise Rejection", test: /Unhandled Promise Rejection|Uncaught \(in promise\)/i, title: "Promise 失败了却没人接",
    meaning: "异步 Promise 拒绝了，但没有 catch，也没有用 try/await 接住。",
    look: "给 Promise 加 .catch，或把 await 放进 try/catch。",
    points: [
      { term: "Promise", text: "异步结果可能成功也可能失败。失败必须有人处理。" },
      { term: "catch", text: "p.catch(...) 或 try { await p } catch (e) { ... }。" }
    ] },
  { lang: "JavaScript", name: "ECONNREFUSED", test: /ECONNREFUSED/, title: "连接被拒绝",
    meaning: "去连一个地址时，对方没有接受。服务可能没启动，或端口不对。",
    look: "确认服务已启动，主机和端口写对。",
    points: [
      { term: "拒绝连接", text: "本机发出去了，但那边没有程序在听这个端口。" },
      { term: "先开服务", text: "先启动要访问的后端或数据库，再让前端或脚本去连。" }
    ] },
  { lang: "JavaScript", name: "ETIMEDOUT", test: /ETIMEDOUT/, title: "连接超时",
    meaning: "在限定时间内没有建立连接或等完响应。",
    look: "检查网络、防火墙和对方服务是否过慢或不可达。",
    points: [
      { term: "超时", text: "等太久仍没有结果，就按失败结束，避免一直挂起。" },
      { term: "可达性", text: "地址写错、服务挂了、网络不通，都可能导致超时。" }
    ] },
  { lang: "JavaScript", name: "EACCES", test: /\bEACCES\b/, title: "没有权限做这件事",
    meaning: "操作系统拒绝了这次文件或端口操作。",
    look: "看路径权限，或端口是否需要管理员权限。",
    points: [
      { term: "权限", text: "读、写、监听端口都可能被系统拦住。" },
      { term: "换路径或提权", text: "没有权限时，换到可写目录，或用有权限的方式启动。" }
    ] },
  { lang: "JavaScript", name: "ERR_REQUIRE_ESM", test: /ERR_REQUIRE_ESM|require\(\) of ES Module/, title: "这个模块不能用 require 加载",
    meaning: "目标是 ES Module，却用了 CommonJS 的 require。",
    look: "改成 import，或确认包的导出方式是否支持 require。",
    points: [
      { term: "两种模块", text: "CommonJS 用 require，ESM 用 import。混用时常撞车。" },
      { term: "按包文档来", text: "新包越来越多只支持 ESM。看文档该用哪种加载方式。" }
    ] },
  { lang: "JavaScript", name: "Failed to fetch", test: /Failed to fetch|NetworkError when attempting to fetch/i, title: "网络请求失败了",
    meaning: "浏览器发起的请求没有成功。可能是地址错、服务没开，或被跨域拦住。",
    look: "看 Network 面板。确认 URL、服务状态，以及是否有 CORS 错误。",
    points: [
      { term: "fetch", text: "浏览器去拉网络资源。失败时要区分：连不上，还是被策略拒绝。" },
      { term: "跨域", text: "前端页面和接口不在同一源时，服务器需要正确的 CORS 头。" }
    ] },
  { lang: "JavaScript", name: "missing ) after argument list", test: /missing \) after argument list/, title: "函数调用少了右括号",
    meaning: "调用函数时，参数列表的右括号没有正确关上。",
    look: "从左括号开始配对。少写的 ) 常常在这一行末尾。",
    points: [
      { term: "括号成对", text: "f(a, b) 的左右括号要成对。少一个就会在这里报错。" },
      { term: "嵌套调用", text: "f(g(h()) 这种多层时，更容易漏括号。从最里面往外数。" }
    ] },
  { lang: "JavaScript", name: "Unexpected number", test: /Unexpected number/, title: "数字出现的位置不对",
    meaning: "数字出现在语法不允许的地方。常见是变量名以数字开头，或少了运算符。",
    look: "看数字前后。变量名不能以数字开头；两个东西并排时要有运算符。",
    points: [
      { term: "名字规则", text: "变量名可以含数字，但不能以数字开头。" },
      { term: "运算符", text: "1 2 中间不能只靠空格。要写 1 + 2 或把它放进合法结构。" }
    ] },
{ lang: "C/C++", name: "use of undeclared identifier", test: /use of undeclared identifier/, title: "这个名字还没声明", rank: 2,
    meaning: "Clang 找不到这个标识符的声明。",
    look: "检查拼写、声明顺序和头文件是否包含。",
    points: [
      { term: "先声明", text: "用之前要让编译器看见声明。写在后面又没有原型，就会不认识。" },
      { term: "include", text: "标准库或自己的头文件忘了 include，也会变成未声明。" }
    ] },
  { lang: "C/C++", name: "no member named", test: /no member named|has no member named/, title: "这个类型没有这个成员",
    meaning: "结构体、类或命名空间里没有你点出来的名字。",
    look: "对照类型定义。成员名是否拼错，是不是用错了类型。",
    points: [
      { term: "成员", text: "obj.x 里的 x 必须是这个类型真实拥有的字段或方法。" },
      { term: "看定义", text: "打开 struct/class 定义，确认有没有这个名字。" }
    ] },
  { lang: "C/C++", name: "expected unqualified-id", test: /expected unqualified-id/, title: "这里少了一个合法名字",
    meaning: "编译器期待一个标识符，却看到了符号或关键字。",
    look: "看是否多写了分号、少写了名字，或把类型名写错了位置。",
    points: [
      { term: "unqualified-id", text: "就是普通的名字。这里缺的是变量名、函数名或类型名。" },
      { term: "多余符号", text: "连续两个分号、空的声明，有时会触发这类提示。" }
    ] },
  { lang: "C/C++", name: "expected primary-expression", test: /expected primary-expression/, title: "这里表达式不完整",
    meaning: "运算符或括号旁边缺少一个完整的值或子表达式。",
    look: "看运算符两边是否都有值，括号是否成对。",
    points: [
      { term: "表达式", text: "能算出值的那一截。缺一边时，表达式就不完整。" },
      { term: "括号", text: "先把括号配对，再看运算符左右是不是都有东西。" }
    ] },
  { lang: "C/C++", name: "multiple definition of", test: /multiple definition of/, title: "同一个符号定义了多次",
    meaning: "链接时发现同一个函数或变量有多份定义。",
    look: "函数定义不要放在会被多次包含的头文件里。只保留一份实现。",
    points: [
      { term: "一份定义", text: "声明可以重复，定义在整个程序里只能有一份。" },
      { term: "头文件", text: "把函数体写在头文件又到处 include，最容易触发重复定义。" }
    ] },
  { lang: "C/C++", name: "ld returned 1 exit status", test: /ld returned 1 exit status|collect2: error: ld returned/, title: "链接失败了",
    meaning: "编译单个文件可能过了，但把目标文件链成可执行文件时失败。",
    look: "往上看更具体的 undefined reference 或 multiple definition。先修那些。",
    points: [
      { term: "链接", text: "把各个 .o 和库拼成最终程序。缺实现或重复定义会在这一步爆。" },
      { term: "看上面的具体错误", text: "这一句只是总结。真正原因通常在它上面几行。" }
    ] },
  { lang: "C/C++", name: "Floating point exception", test: /Floating point exception/, title: "发生了非法的算术运算",
    meaning: "常见是整数除以 0，或对 0 取余。",
    look: "检查除法和取余的右操作数是不是 0。",
    points: [
      { term: "除以 0", text: "整数除法或取余时，右边不能是 0。" },
      { term: "先判断", text: "除之前先确认除数不为 0。" }
    ] },
  { lang: "C/C++", name: "Bus error", test: /Bus error/, title: "内存访问方式不对",
    meaning: "程序以不合法的方式访问了内存。有时和未对齐访问或坏指针有关。",
    look: "检查指针是否有效，是否把普通整数硬当指针用。",
    points: [
      { term: "指针有效", text: "先分配或指向有效对象，再解引用。" },
      { term: "别乱转类型", text: "把不相干的整数强转成指针，很容易踩到非法地址。" }
    ] },
  { lang: "C/C++", name: "stack smashing detected", test: /stack smashing detected/, title: "栈被破坏了",
    meaning: "多半是数组写越界，把函数栈上的其他数据覆盖了。",
    look: "检查最近的数组写入是否超过了长度。",
    points: [
      { term: "栈保护", text: "编译器在栈上放了检测值。被越界写坏后，退出时就会报警。" },
      { term: "数组别越界", text: "写入下标必须小于数组长度。循环条件写错最常见。" }
    ] },
  { lang: "C/C++", name: "assignment makes pointer from integer", test: /assignment makes pointer from integer|assignment makes integer from pointer/, title: "指针和整数被混用了",
    meaning: "把整数赋给了指针，或把指针赋给了整数，类型不匹配。",
    look: "确认变量该不该是指针。需要地址时用 &，需要值时用 *。",
    points: [
      { term: "指针存地址", text: "指针变量里放的是地址，不是普通整数计算结果。" },
      { term: "& 和 *", text: "&x 取地址，*p 取内容。用错一层，类型就会乱。" }
    ] },
  { lang: "C/C++", name: "dereferencing pointer to incomplete type", test: /dereferencing pointer to incomplete type/, title: "解引用了不完整类型的指针",
    meaning: "只知道有这个结构体名字，还没看到完整定义，就不能用 * 或 ->。",
    look: "包含定义了该结构体的头文件，或把完整定义放到使用之前。",
    points: [
      { term: "不完整类型", text: "只写了 struct Foo; 还没有字段列表时，它就是不完整的。" },
      { term: "要用字段先看定义", text: "访问成员前，编译器必须已经看见完整的 struct 定义。" }
    ] },
  { lang: "C/C++", name: "subscripted value is neither array nor pointer", test: /subscripted value is neither array nor pointer/, title: "不能对这个值使用下标",
    meaning: "你写了 a[i]，但 a 既不是数组也不是指针。",
    look: "确认 a 的类型。整数不能直接当数组用。",
    points: [
      { term: "下标", text: "[] 用在数组或指针上。普通 int 没有下标可言。" },
      { term: "看声明", text: "先看 a 是怎么声明的，再决定能不能写 a[i]。" }
    ] },
  { lang: "C/C++", name: "void value not ignored as it ought to be", test: /void value not ignored as it ought to be/, title: "void 函数的结果不能拿来用",
    meaning: "函数返回 void，你却把它的调用结果拿去赋值或参与运算。",
    look: "删掉对 void 函数返回值的使用，只保留调用本身。",
    points: [
      { term: "void", text: "表示没有返回值。不能写成 x = f(); 如果 f 是 void。" },
      { term: "只调用", text: "需要它做事时，写成 f(); 即可。" }
    ] },
  { lang: "C/C++", name: "lvalue required", test: /lvalue required/, title: "这里需要一个可以赋值的左值",
    meaning: "等号左边或取地址的对象不能是临时值或常量表达式。",
    look: "把结果先放进变量，再对变量赋值或取地址。",
    points: [
      { term: "左值", text: "有稳定存储位置的东西，例如变量。3 + 4 这种临时结果不是。" },
      { term: "先存变量", text: "需要对结果再操作时，先赋给一个变量。" }
    ] },
  { lang: "HTML", name: "Start tag seen without seeing a doctype first", test: /Start tag seen without seeing a doctype first/i, title: "缺少 doctype",
    meaning: "文档开头没有 <!DOCTYPE html>，浏览器可能进入怪异模式。",
    look: "把文件第一行写成 <!DOCTYPE html>，再写 html 根元素。",
    points: [
      { term: "doctype", text: "告诉浏览器按现代 HTML 规则解析页面。" },
      { term: "放在最前", text: "它应该出现在文件最开头，前面不要有别的内容。" }
    ] },
  { lang: "HTML", name: "Stray doctype", test: /Stray doctype/i, title: "doctype 放错位置了",
    meaning: "DOCTYPE 出现在不该出现的地方，或重复出现。",
    look: "只保留文件最开头那一个 <!DOCTYPE html>。",
    points: [
      { term: "只需一次", text: "整个页面一个 doctype 就够了。" },
      { term: "位置", text: "它只能在最前面。塞进 body 里就是放错了。" }
    ] },
  { lang: "HTML", name: "Forbidden content", test: /Forbidden content/i, title: "这里放了不允许的内容",
    meaning: "某个父标签里出现了它不能包含的内容或标签。",
    look: "看报错上下文，把不该出现的标签挪走或改成允许的结构。",
    points: [
      { term: "内容模型", text: "每种标签能装什么是有规定的，不是任意嵌套。" },
      { term: "对照父标签", text: "先看父标签是谁，再决定孩子能不能放进去。" }
    ] },
  { lang: "HTML", name: "End of file seen", test: /End of file (?:seen|reached)|end of file reached when/i, title: "文件结束了，标签还没写完",
    meaning: "文件已经结束，但仍有标签没有闭合，或标签写到一半。",
    look: "从后往前检查未闭合的标签，把缺失的结束标签补上。",
    points: [
      { term: "要闭合", text: "开始了的标签，在文件结束前应该关上。" },
      { term: "半截标签", text: "属性或引号没写完就结束文件，也会触发这类问题。" }
    ] },
  { lang: "HTML", name: "Element is missing required attribute", test: /Element .+ is missing required attribute|missing required attribute/i, title: "缺少必需属性",
    meaning: "这个标签按规定必须带某个属性，你没有写。",
    look: "看 missing 后面的属性名，补上它。",
    points: [
      { term: "必需属性", text: "有的标签没有某个属性就不完整，例如某些情况下的 src、alt。" },
      { term: "按提示补", text: "报错会写出缺哪个。对着补上即可。" }
    ] },
  { lang: "HTML", name: "Self-closing syntax used on a non-void", test: /Self-closing syntax used on a non-void|trailing slash on void/i, title: "这个标签的自闭合写法不对",
    meaning: "在不该自闭合的标签上使用了 />，或 void 标签写法不符合当前规则。",
    look: "普通标签写成成对的开始和结束；void 标签按 HTML5 习惯书写。",
    points: [
      { term: "void 标签", text: "img、br、hr、input 没有结束标签。" },
      { term: "普通标签", text: "div、span、p 要写成一对，不要只靠 /> 糊弄过去。" }
    ] },
  { lang: "HTML", name: "Non-space characters found without seeing a doctype", test: /Non-space characters found without seeing a doctype/i, title: "doctype 前有多余字符",
    meaning: "DOCTYPE 前面出现了文字或符号。它必须在最开头。",
    look: "删掉文件最前面的空内容以外的字符，确保 DOCTYPE 第一行。",
    points: [
      { term: "最开头", text: "BOM、说明文字、误贴的代码都不该出现在 doctype 前。" },
      { term: "先清再写", text: "从第一字节开始就是 <!DOCTYPE html>。" }
    ] },
  { lang: "HTML", name: "Heading cannot be a child", test: /Heading cannot be a child|h[1-6].*cannot be a child/i, title: "标题标签放错父级了",
    meaning: "h1–h6 被放进了不允许包含标题的元素里。",
    look: "把标题挪到合适的容器中，不要塞进 button、a 等受限元素里乱套。",
    points: [
      { term: "标题", text: "h1 到 h6 用来标节标题，父级要合理。" },
      { term: "别乱嵌", text: "交互元素里面再塞标题，结构容易不合法。" }
    ] },
  { lang: "HTML", name: "A table row was 3 columns wide, but the last", test: /A table row was \d+ columns (?:wide|long), but (?:the last|some)/i, title: "表格列数对不齐",
    meaning: "某一行的单元格数量和表头或其他行不一致。",
    look: "数一数每一行的 td/th，让列数一致，或正确使用 colspan。",
    points: [
      { term: "表格行列", text: "每一行的格子数应当对得上，读起来才是一张整齐的表。" },
      { term: "colspan", text: "合并单元格时要用 colspan，而不是少写一个 td 却期望自动对齐。" }
    ] },
  { lang: "HTML", name: "Saw tags when expecting", test: /Saw .+ when expecting|Unexpected tags in/i, title: "标签出现在了不该出现的位置",
    meaning: "解析器在这个位置期待别的内容，却看到了这个标签。",
    look: "检查前后标签是否闭合，结构是否套错层。",
    points: [
      { term: "解析位置", text: "HTML 解析是顺着往下走的。前一层没结束，后一层就会错位。" },
      { term: "先闭合再开", text: "该关上的先关上，再开新的兄弟或父级标签。" }
    ] },
{ lang: "CSS", name: "expected RBRACE", test: /expected RBRACE|expected '\}'(?! at end of input)/i, title: "这里少了右大括号", rank: 2,
    meaning: "一块规则还没有用 } 结束。",
    look: "从最近的 { 往下配对，把缺少的 } 补上。",
    points: [
      { term: "RBRACE", text: "就是右大括号 }。用来结束一块选择器的声明。" },
      { term: "配对", text: "有一个 { 就要有一个 }。少了后面的规则会全部乱掉。" }
    ] },
  { lang: "CSS", name: "Expected identifier", test: /(?<!un)(?:Expected identifier|expected IDENT)/i, title: "这里少了属性名或标识符",
    meaning: "解析器在这里期待一个名字，例如属性名或选择器名。",
    look: "看是不是多了冒号、分号，或属性名被删掉了只剩值。",
    points: [
      { term: "标识符", text: "属性名、类名这些「名字」都是标识符。" },
      { term: "声明完整", text: "要写成 属性: 值; 不能只写一边。" }
    ] },
  { lang: "CSS", name: "Unclosed string", test: /Unclosed string(?! literal)|string did not terminate/i, title: "字符串没有结束",
    meaning: "引号开了头，没有关上。",
    look: "把 url、content 或字体名两边的引号补成对。",
    points: [
      { term: "引号成对", text: "开始用了双引号，就要用双引号结束。" },
      { term: "url 和 content", text: "这些地方最容易忘了关引号。" }
    ] },
  { lang: "CSS", name: "Expected color", test: /(?<!un)(?:Expected color|expected a color)/i, title: "这里应该是一个颜色",
    meaning: "这个属性需要颜色值，你给的不是合法颜色。",
    look: "写成 #rgb、#rrggbb、rgb()、或 red 这类关键字。",
    points: [
      { term: "颜色值", text: "颜色有固定写法，不能随便写一个词。" },
      { term: "常见写法", text: "#336699、rgb(51,102,153)、red 都可以，看属性要求。" }
    ] },
  { lang: "CSS", name: "Expected number", test: /(?<!un)(?:Expected number|expected a number)/i, title: "这里应该是一个数字",
    meaning: "这个位置需要数字，却出现了别的内容。",
    look: "补上数字，需要单位时带上 px、em 或 %。",
    points: [
      { term: "数字", text: "透明度、倍率、部分函数参数都要求是数字。" },
      { term: "单位", text: "长度数字后面通常还要单位，除非是 0 或规范允许的无单位值。" }
    ] },
  { lang: "CSS", name: "Unknown word", test: /Unknown word/i, title: "出现了无法识别的词",
    meaning: "这个词不是合法的属性、值或关键字。",
    look: "检查拼写。确认没有把 HTML 或别的语言句子粘进 CSS。",
    points: [
      { term: "关键字有限", text: "CSS 能认的词是有名单的。拼错就不认识。" },
      { term: "别贴错文件", text: "把 HTML 片段贴进 CSS，会冒出一串 Unknown word。" }
    ] },
  { lang: "CSS", name: "Expected Selectors", test: /(?<!un)(?:Expected Selectors|expected a selector)/i, title: "这里应该是选择器",
    meaning: "解析器期待选择器，却看到了别的东西。",
    look: "确认上一块已经用 } 结束，再写新的选择器。",
    points: [
      { term: "选择器开头", text: "新规则要从选择器开始，例如 .card 或 #title。" },
      { term: "上一块结束", text: "少写 } 时，后面的内容都会被吞进上一块。" }
    ] },
  { lang: "CSS", name: "Parse Error", test: /Parse Error|Parsing Errors?/i, title: "这段 CSS 解析失败",
    meaning: "这一段没法按 CSS 语法读懂。",
    look: "从报错附近检查括号、引号、分号。把明显坏掉的那一规则先注释掉定位。",
    points: [
      { term: "解析", text: "浏览器按语法拆读样式。某一处坏了，后面可能继续受影响。" },
      { term: "缩小范围", text: "先注释最近改过的几行，能更快找到坏点。" }
    ] },
  { lang: "CSS", name: "Expected media condition", test: /(?<!un)(?:Expected media condition|expected media feature)/i, title: "@media 条件写错了",
    meaning: "@media 后面的条件不符合语法。",
    look: "写成 @media (max-width: 600px) { ... } 这种形式。",
    points: [
      { term: "@media", text: "用来按屏幕条件套用样式。条件要写在括号里。" },
      { term: "特征", text: "常用 max-width、min-width。冒号两边是特征和值。" }
    ] },
  { lang: "CSS", name: "Unexpected end of stylesheet", test: /Unexpected end of stylesheet/i, title: "样式表突然结束了", needLang: true,
    meaning: "文件结束了，但还有没关上的括号或字符串。",
    look: "从文件末尾往上找未闭合的 { 或引号。",
    points: [
      { term: "要收尾", text: "开了的括号和引号，在文件结束前都要关上。" },
      { term: "从后往前查", text: "突然结束时，问题多半是最后几块少了 }。" }
    ] },
  { lang: "Java", name: "InterruptedException", test: /InterruptedException/, title: "线程等待被打断了",
    meaning: "线程在 sleep、wait 或阻塞时被中断。",
    look: "看是谁调用了 interrupt。要么正确结束这次等待，要么把中断状态继续传出去。",
    points: [
      { term: "中断", text: "中断是协作式的。收到 InterruptedException 表示有人希望这个线程停下来。" },
      { term: "不要空着 catch", text: "把异常吞掉会让中断信号消失。至少要恢复中断标记，或继续抛出。" }
    ] },
  { lang: "Java", name: "IllegalMonitorStateException", test: /IllegalMonitorStateException/, title: "没有锁却调用了 wait 或 notify",
    meaning: "wait、notify、notifyAll 必须在持有该对象锁的时候调用。",
    look: "把调用放进 synchronized (这个对象) 里面，锁的对象要和 wait 的对象是同一个。",
    points: [
      { term: "对象锁", text: "每个对象都能当一把锁。wait 必须先拿到这把锁。" },
      { term: "同一个对象", text: "synchronized (a) 里面只能 a.wait()。锁 b 却调用 a.wait() 也会失败。" }
    ] },
  { lang: "Java", name: "ArrayStoreException", test: /ArrayStoreException/, title: "数组里放入了不兼容的类型",
    meaning: "数组的真实元素类型装不下你放进去的对象。",
    look: "看数组创建时的类型，和 add/赋值的对象类型是否是它的子类。",
    points: [
      { term: "真实组件类型", text: "Object[] a = new String[1]; 再放入 Integer，运行时会失败。声明类型骗得过编译器，骗不过数组。" },
      { term: "编译期和运行期", text: "数组的类型检查有一部分留到运行时。放错对象时在这里停下。" }
    ] },
  { lang: "Java", name: "EmptyStackException", test: /EmptyStackException/, title: "栈已经空了还在弹出",
    meaning: "对一个空栈调用了 pop 或 peek。",
    look: "弹出前先看栈是不是空的。",
    points: [
      { term: "栈", text: "后进先出。没有元素时不能再弹出。" },
      { term: "先判断", text: "用 empty() 或 isEmpty() 看过再 pop。" }
    ] },
  { lang: "Java", name: "PatternSyntaxException", test: /PatternSyntaxException/, title: "正则表达式写错了",
    meaning: "传给 Pattern.compile 的正则，语法不合法。",
    look: "看报错指出的位置。括号、方括号和转义要成对。",
    points: [
      { term: "正则", text: "它是一套描述文本模式的小语言，写错一个符号就编译失败。" },
      { term: "先少写再加", text: "先写一个能通过的短模式，再一点点加上分组和量词。" }
    ] },
  { lang: "Java", name: "DateTimeParseException", test: /DateTimeParseException/, title: "日期文字解析失败",
    meaning: "这段文字不符合你指定的日期时间格式。",
    look: "对照 DateTimeFormatter 的模式，和实际字符串的位数、分隔符。",
    points: [
      { term: "格式模式", text: "yyyy-MM-dd 只能对上 2026-10-17 这种形状。差一个符号就解析不了。" },
      { term: "和输入对齐", text: "用户输入是什么样子，模式就按那个样子写，不要按自己希望的样子猜。" }
    ] },
  { lang: "Java", name: "SQLException", test: /SQLException/, title: "数据库操作失败",
    meaning: "JDBC 执行 SQL 或连接数据库时失败了。",
    look: "看 getMessage 和 SQLState。先确认连接、SQL 和参数。",
    points: [
      { term: "JDBC", text: "Java 通过 JDBC 跟数据库说话。失败会包成 SQLException。" },
      { term: "看下一层原因", text: "真正的表不存在、语法错、连接断，经常写在 cause 或下一条异常里。" }
    ] },
  { lang: "Java", name: "MalformedURLException", test: /MalformedURLException/, title: "URL 格式不合法",
    meaning: "new URL 收到的字符串不是合法 URL。",
    look: "检查协议、冒号和斜杠。例如 https://example.com。",
    points: [
      { term: "URL", text: "它要有协议，像 http 或 https，后面才是地址。" },
      { term: "不要漏协议", text: "只写 www.example.com 往往不够，前面要有 https://。" }
    ] },
  { lang: "Java", name: "URISyntaxException", test: /URISyntaxException/, title: "URI 语法不合法",
    meaning: "这段文字违反了 URI 语法，非法字符或结构不对。",
    look: "看报错里的索引，它指向出错的那个字符。空格等字符要编码。",
    points: [
      { term: "URI", text: "统一资源标识。比随便一串文字更严格。" },
      { term: "编码", text: "空格和中文放进查询参数前，通常要做百分号编码。" }
    ] },
  { lang: "Java", name: "UnknownHostException", test: /UnknownHostException/, title: "找不到这个主机名",
    meaning: "域名无法解析成地址。主机名写错，或当时没有网络、没有 DNS。",
    look: "先看主机名拼写。再确认这台机器能解析域名。",
    points: [
      { term: "主机名", text: "example.com 这样的名字要先变成 IP，连接才能继续。" },
      { term: "DNS", text: "负责把名字查成地址。查不到就连接不了。" }
    ] },
  { lang: "Java", name: "ConnectException", test: /ConnectException/, title: "连接对方失败",
    meaning: "TCP 连接没有建立。对方没开服务、端口错，或被拒绝。",
    look: "确认主机、端口，以及服务进程已经在听这个端口。",
    points: [
      { term: "端口", text: "服务在某个端口上等连接。连错端口就像敲错门。" },
      { term: "先开服务", text: "客户端去连之前，服务端要已经启动。" }
    ] },
  { lang: "Java", name: "SocketException", test: /SocketException/, title: "套接字出错了",
    meaning: "网络套接字在连接、读写时出了问题。可能已断开或被重置。",
    look: "看完整英文。Connection reset 表示对方把连接掐了。",
    points: [
      { term: "套接字", text: "程序用来收发网络数据的一端。" },
      { term: "连接会断", text: "对方关闭、网络中断，正在读写的套接字就会失败。" }
    ] },
  { lang: "Java", name: "EOFException", test: /EOFException/, title: "流提前结束了",
    meaning: "还想再读数据，输入流已经到末尾。",
    look: "看读取的长度和对方是否提前关闭。不要假设后面一定还有字节。",
    points: [
      { term: "流的末尾", text: "EOF 表示没有更多数据了。" },
      { term: "协议长度", text: "如果约定了要读满多少字节，对方少发就会在这里停。" }
    ] },
  { lang: "Java", name: "InterruptedIOException", test: /InterruptedIOException/, rank: 2, title: "读写时被中断了",
    meaning: "阻塞的 IO 因为线程中断而停下来。",
    look: "决定是停止任务，还是恢复中断标记后重试。",
    points: [
      { term: "阻塞 IO", text: "读文件或网络时线程可能停在那里等。中断会把它叫醒并失败。" },
      { term: "中断标记", text: "抓住之后不要把中断信号悄悄丢掉。" }
    ] },
  { lang: "Java", name: "UnsupportedEncodingException", test: /UnsupportedEncodingException/, title: "不认识这种字符编码",
    meaning: "你写的编码名字不是 Java 支持的字符集。",
    look: "把编码写成 UTF-8 这类标准名字，注意大小写和连字符。",
    points: [
      { term: "字符集", text: "字节和文字之间的对照表。名字必须是平台认识的。" },
      { term: "UTF-8", text: "交换文本时优先用 UTF-8，少用容易写错的别名。" }
    ] },
  { lang: "Java", name: "IllegalAccessException", test: /IllegalAccessException/, title: "没有权限访问这个成员",
    meaning: "反射时，字段或方法按当前可见性不能访问。",
    look: "看它是 private 还是包可见。确实要访问时才放宽，并知道这很脆弱。",
    points: [
      { term: "可见性", text: "private 成员默认不能从类外面直接拿。" },
      { term: "反射", text: "用 Class 和 Method 在运行时找成员。找不到权限一样会失败。" }
    ] },
  { lang: "Java", name: "IllegalAccessError", test: /IllegalAccessError/, title: "访问了不该访问的成员",
    meaning: "编译时看得见，运行时这个成员的访问级别不允许你用。",
    look: "常见于类路径上的库版本和编译时不一致。把依赖版本对齐。",
    points: [
      { term: "编译和运行", text: "两边的类定义不一样时，会在运行期爆出 Error。" },
      { term: "版本对齐", text: "编译用的 jar 和运行用的 jar 应是兼容的同一套。" }
    ] },
  { lang: "Java", name: "NoSuchMethodException", test: /NoSuchMethodException/, title: "反射时找不到这个方法",
    meaning: "按你给的方法名和参数类型，类里没有对应方法。",
    look: "核对方法名、参数类型的 Class 对象，包括顺序。",
    points: [
      { term: "方法签名", text: "方法名加上参数类型才唯一确定一个方法。" },
      { term: "getMethod", text: "公开方法用 getMethod。私有方法才用 getDeclaredMethod。" }
    ] },
  { lang: "Java", name: "NoSuchMethodError", test: /NoSuchMethodError/, title: "运行时找不到这个方法",
    meaning: "编译时有这个方法，运行用的类里却没有。",
    look: "几乎总是依赖版本错了。检查真正加载到的 jar。",
    points: [
      { term: "NoSuchMethodError", text: "这是 Error，不是检查型异常。出了就说明类文件对不上。" },
      { term: "依赖冲突", text: "项目里同一个库出现了两份时，运行时可能用到旧的那份。" }
    ] },
  { lang: "Java", name: "NoSuchFieldException", test: /NoSuchFieldException/, title: "反射时找不到这个字段",
    meaning: "类里没有你写的那个字段名。",
    look: "核对拼写。私有字段要用 getDeclaredField。",
    points: [
      { term: "字段名", text: "必须和类里声明的一模一样，区分大小写。" },
      { term: "getField 的范围", text: "getField 只找公开字段。私有的不在里面。" }
    ] },
  { lang: "Java", name: "InstantiationException", test: /InstantiationException/, title: "这个类不能被直接实例化",
    meaning: "反射 newInstance 时，类是抽象的、是接口，或没有空构造。",
    look: "改成具体子类，或调用带参数的构造器。",
    points: [
      { term: "抽象类", text: "抽象类不能 new。要 new 实现了全部抽象方法的子类。" },
      { term: "构造器", text: "Class.newInstance 需要一个可访问的无参构造。没有就会失败。" }
    ] },
  { lang: "Java", name: "ExceptionInInitializerError", test: /ExceptionInInitializerError/, title: "类的静态初始化失败了",
    meaning: "static 块或静态字段初始化时抛了异常，类没能完成加载。",
    look: "看 Caused by。真正的错在静态初始化里的那一行。",
    points: [
      { term: "静态初始化", text: "类第一次被用到时，会先跑静态字段和 static 块。" },
      { term: "原因在里面", text: "外层只说明初始化失败。里面那条才是你要修的。" }
    ] },
  { lang: "Java", name: "incomparable types", test: /incomparable types/, title: "这两个类型不能比较",
    meaning: "用 == 或关系运算比较了不能放在一起比的类型。",
    look: "看两边的类型。对象内容是否相同要用 equals，不要用 == 比内容。",
    points: [
      { term: "==", text: "对对象来说，== 比的是是不是同一个对象，而且类型要能比。" },
      { term: "equals", text: "比字符串或对象内容时，用 equals。" }
    ] },
  { lang: "Java", name: "reference to foo is ambiguous", test: /reference to .+ is ambiguous/, title: "这个调用有多种解释",
    meaning: "重载太接近，编译器无法决定该用哪一个方法。",
    look: "把参数改成更明确的类型，或加一次强制转换消歧义。",
    points: [
      { term: "重载", text: "同名方法靠参数类型区分。两种都说得通时，编译器拒绝猜。" },
      { term: "写明确", text: "把参数收成某一边确切的类型，选择就唯一了。" }
    ] },
  { lang: "Java", name: "cyclic inheritance", test: /cyclic inheritance/, title: "继承关系绕成了圈",
    meaning: "类或接口的继承链又指回了自己。",
    look: "打开那几个类型，把循环的 extends 或 implements 拆开。",
    points: [
      { term: "继承链", text: "A 继承 B，B 不能再继承回 A。" },
      { term: "接口也会循环", text: "接口之间的 extends 同样不能成环。" }
    ] },
  { lang: "Java", name: "duplicate case label", test: /duplicate case label/, title: "switch 里这个 case 重复了",
    meaning: "同一个 switch 中，同一个常量出现了两次。",
    look: "删掉重复的 case，或改成不同的常量。",
    points: [
      { term: "case", text: "每个 case 的值在同一个 switch 里只能出现一次。" },
      { term: "常量", text: "这里要比对的是编译期就能确定的常量。" }
    ] },
  { lang: "Java", name: "constant expression required", test: /constant expression required/, title: "这里需要一个常量",
    meaning: "switch 的 case 或注解里放了运行时才知道的值。",
    look: "改成字面量或 final 常量。普通变量不能当 case。",
    points: [
      { term: "case 标签", text: "传统 switch 的 case 必须是常量表达式。" },
      { term: "变量不行", text: "运行中才会变的变量，不能用来当 case 的标签。" }
    ] },
  { lang: "Java", name: "break outside switch or loop", test: /break outside switch or loop/, title: "break 没有落在循环或 switch 里",
    meaning: "break 写在了它能作用的结构外面。",
    look: "确认它在 for、while 或 switch 的大括号内。",
    points: [
      { term: "break", text: "用来离开最近的循环或 switch。外面没有这些结构就不能写。" },
      { term: "大括号范围", text: "break 属于哪一层，看它被哪一对大括号包住。" }
    ] },
  { lang: "Java", name: "continue outside of loop", test: /continue outside of loop/, title: "continue 不在循环里",
    meaning: "continue 只能用在循环内部。",
    look: "把它移进 for 或 while，或删掉这句。",
    points: [
      { term: "continue", text: "跳过本轮，进入下一轮循环。没有循环就无处可跳。" },
      { term: "不要放在方法末尾凑数", text: "它不是普通语句，必须依附循环。" }
    ] },
  { lang: "Java", name: "non-static variable cannot be referenced", test: /non-static variable cannot be referenced/, rank: 2, title: "静态环境里用了实例变量",
    meaning: "static 方法或静态上下文里，直接使用了属于对象的字段。",
    look: "通过一个对象去用它，或把字段也改成 static。先想清楚它该不该属于整个类。",
    points: [
      { term: "static", text: "属于类本身，不需要先有对象。" },
      { term: "实例字段", text: "每个对象一份。没有对象时，就没有那一份字段。" }
    ] },
  { lang: "Java", name: "variable might already have been assigned", test: /variable might already have been assigned/, title: "这个空白 final 可能被赋了两次",
    meaning: "final 变量在某条路径上已经有值，又被赋值。",
    look: "让每条路径正好赋一次。不要在已赋值的分支里再写一次。",
    points: [
      { term: "空白 final", text: "可以先声明，稍后再赋，但只能赋一次。" },
      { term: "每条路径一次", text: "if 的两边都要检查，不能一边赋了、汇合后又赋。" }
    ] },
  { lang: "Java", name: "exception is never thrown", test: /exception is never thrown/, title: "这个异常根本不会被抛出",
    meaning: "catch 写了某个检查型异常，但 try 里没有代码会抛它。",
    look: "删掉这个多余的 catch，或把会抛它的调用放进 try。",
    points: [
      { term: "检查型异常", text: "编译器知道哪些调用会抛。没有那样的调用，catch 就是多余的。" },
      { term: "catch 要有来源", text: "每个 catch 都应该对应 try 里可能出现的那种异常。" }
    ] },
  { lang: "Java", name: "unreachable catch", test: /unreachable catch/, title: "这个 catch 永远轮不到",
    meaning: "前面已经有一个更宽的 catch 把它挡住了。",
    look: "把更具体的 catch 放上面，宽的放下面。",
    points: [
      { term: "捕获顺序", text: "上面的 catch 先匹配。父类异常放前面，子类就没机会了。" },
      { term: "先具体后宽泛", text: "先 catch 子类，最后再 catch Exception。" }
    ] },
  { lang: "Java", name: "local variables referenced from a lambda", test: /local variables referenced from (?:a lambda|an inner class)/, title: "lambda 里用的局部变量必须是最终的",
    meaning: "lambda 捕获的局部变量，之后又被赋值了。",
    look: "不要在 lambda 外面再改这个变量。需要变化时，改用对象字段或数组装它。",
    points: [
      { term: "捕获", text: "lambda 可以使用外面的局部变量，但那个变量不能再变。" },
      { term: "effectively final", text: "即使没写 final，只要之后没再赋值，也算实际最终。" }
    ] },
  { lang: "Java", name: "foreach not applicable", test: /foreach not applicable/, title: "这个对象不能用增强 for",
    meaning: "for (元素 : 容器) 要求容器是数组或 Iterable。",
    look: "确认右边是数组、List 等。一个普通对象不能这样遍历。",
    points: [
      { term: "增强 for", text: "用来逐个取出数组或可迭代对象里的元素。" },
      { term: "Iterable", text: "List、Set 实现了它。普通的自定义对象默认没有。" }
    ] },
  { lang: "Java", name: "cannot infer type arguments", test: /cannot infer type arguments/, title: "泛型类型推断失败了",
    meaning: "编译器无法从这次调用推断出类型参数。",
    look: "在方法调用前显式写上类型参数，或让参数类型更明确。",
    points: [
      { term: "类型推断", text: "编译器想替你写出 <String> 这种参数。线索不够时就会放弃。" },
      { term: "显式写出", text: "写成 对象.<String>方法(...) 可以把推断补上。" }
    ] },
  { lang: "Java", name: "integer number too large", test: /integer number too large/, title: "这个整数超出了字面量范围",
    meaning: "你写的数字太大，int 字面量装不下。",
    look: "长整数在末尾加 L，或确认这个数确实需要这么大。",
    points: [
      { term: "int 字面量", text: "不带后缀的整数默认是 int。超过约 21 亿就装不下。" },
      { term: "L 后缀", text: "123L 表示 long。更大的数要用它。" }
    ] },
  { lang: "Java", name: "possible loss of precision", test: /possible loss of precision/, rank: 2, title: "这个赋值可能损失精度",
    meaning: "把范围更大的数赋给更小的类型，旧版编译器这样说。",
    look: "确认可以截断后再写显式转换，例如 (int) x。",
    points: [
      { term: "精度", text: "小数或更大的整数放进小类型时，多出来的部分留不住。" },
      { term: "显式转换", text: "写出 (int) 表示你接受这种截断。" }
    ] },
  { lang: "Java", name: "unclosed character literal", test: /unclosed character literal/, title: "字符字面量没有结束",
    meaning: "单引号开了头，没有在正确的位置关上。",
    look: "一个 char 用一对单引号，里面通常只有一个字符。多字符要用双引号字符串。",
    points: [
      { term: "char", text: "单引号包住一个字符，例如 'a'。" },
      { term: "字符串用双引号", text: "多个字符写成 \"ab\"，不要写成 'ab'。" }
    ] },
  { lang: "Java", name: "empty character literal", test: /empty character literal/, title: "字符字面量是空的",
    meaning: "写了 ''，里面没有字符。",
    look: "放进一个字符，或改成字符串。",
    points: [
      { term: "不能为空", text: "char 必须正好有一个字符。空的不合法。" },
      { term: "空字符串另说", text: "空字符串是 \"\"，那是 String，不是 char。" }
    ] },
  { lang: "Java", name: "illegal escape character", test: /illegal escape character/, title: "这个转义序列不合法",
    meaning: "反斜杠后面的字符不是 Java 认识的转义。",
    look: "常用的是 \\n、\\t、\\\\、\\\"。路径里的反斜杠要写成 \\\\。",
    points: [
      { term: "转义", text: "反斜杠表示后面的字符有特殊含义。" },
      { term: "Windows 路径", text: "Java 字符串里一个 \\ 要写成 \\\\。" }
    ] },
  { lang: "Java", name: "modifier static not allowed here", test: /modifier static not allowed here/, title: "这个位置不能写 static",
    meaning: "在不允许静态的地方加了 static，例如普通局部类或某些方法内部。",
    look: "去掉 static，或把这段代码挪到允许静态成员的类型里。",
    points: [
      { term: "static 的位置", text: "它有规定能出现的地方，不是任何大括号里都能加。" },
      { term: "成员和局部", text: "局部变量、局部类通常不能是 static。" }
    ] },
  { lang: "Java", name: "interface expected here", test: /interface expected here/, title: "这里需要一个接口",
    meaning: "implements 后面写了类，或类型位置不符合接口要求。",
    look: "implements 后面只能是接口。继承类用 extends。",
    points: [
      { term: "implements", text: "用来声明实现哪些接口。" },
      { term: "extends", text: "类继承类用 extends。不要和 implements 用反。" }
    ] },
  { lang: "Java", name: "enum types must not be local", test: /enum types must not be local/, title: "枚举不能定义在方法里面",
    meaning: "enum 被写进了方法或局部作用域。",
    look: "把 enum 挪到类的成员位置，或单独一个文件。",
    points: [
      { term: "枚举", text: "它是一种特殊的类，用来列举固定的几个常量。" },
      { term: "放在类型一级", text: "不要写在方法体内部。" }
    ] },
  { lang: "Python", name: "KeyboardInterrupt", test: /KeyboardInterrupt/, title: "程序被手动中断了",
    meaning: "运行中按下了中断键，通常是 Ctrl+C。",
    look: "这不一定是代码写错。如果要优雅退出，可以抓住它做清理再结束。",
    points: [
      { term: "Ctrl+C", text: "终端里用来请求程序停下来。" },
      { term: "不是语法错", text: "程序能跑，只是被你或外部中断了。" }
    ] },
  { lang: "Python", name: "SystemExit", test: /SystemExit/, title: "程序调用了退出",
    meaning: "代码执行了 sys.exit，或解释器正在退出。",
    look: "看是谁调用了 sys.exit，以及传出的退出码。",
    points: [
      { term: "sys.exit", text: "用来结束进程。它通过抛出 SystemExit 实现。" },
      { term: "退出码", text: "0 通常表示正常结束，非 0 表示异常结束。" }
    ] },
  { lang: "Python", name: "GeneratorExit", test: /GeneratorExit/, title: "生成器被提前关闭了",
    meaning: "还没迭代完，生成器就被关闭或垃圾回收了。",
    look: "看生成器里 close 或 break 之后还有没有不该执行的收尾。",
    points: [
      { term: "生成器", text: "用 yield 一个个产出值的函数。" },
      { term: "关闭", text: "调用方不再继续 next 时，生成器会收到关闭。" }
    ] },
  { lang: "Python", name: "NotImplementedError", test: /NotImplementedError/, title: "这个方法还没实现",
    meaning: "子类或占位方法故意抛出它，表示这里应该被覆盖。",
    look: "找到抛出的那个方法，写上真正的实现，或改用已经实现的子类。",
    points: [
      { term: "占位", text: "父类可以先把方法留空，并用这个异常提醒你去实现。" },
      { term: "覆盖", text: "子类写出同名方法后，才不会走到抛异常的那一版。" }
    ] },
  { lang: "Python", name: "OverflowError", test: /\bOverflowError\b/, title: "数字结果太大了",
    meaning: "计算结果超出了这种运算能表示的范围。",
    look: "看是不是指数、阶乘或整数转成某种固定宽度时爆了。",
    points: [
      { term: "溢出", text: "结果大到当前这个操作无法表示。" },
      { term: "Python 整数", text: "普通 int 可以很大。溢出更多出现在转成固定范围，或某些数学函数。" }
    ] },
  { lang: "Python", name: "BlockingIOError", test: /BlockingIOError/, rank: 2, title: "这次 IO 会阻塞，但被设成了非阻塞",
    meaning: "对非阻塞流做了会等待的操作，现在没有数据可立刻完成。",
    look: "稍后再试，或改用能等待的写法。不要把它当成文件不存在。",
    points: [
      { term: "非阻塞", text: "调用应立刻返回。数据还没准备好时就报这个。" },
      { term: "重试", text: "这常常表示「现在还没有」，不是「永远失败」。" }
    ] },
  { lang: "Python", name: "ChildProcessError", test: /ChildProcessError/, title: "子进程操作失败了",
    meaning: "对子进程的等待或信号操作出了问题。",
    look: "看进程是否已经结束，pid 是否还有效。",
    points: [
      { term: "子进程", text: "由当前程序再启动的另一个程序。" },
      { term: "先确认还活着", text: "进程已经退出后，再对它做某些操作会失败。" }
    ] },
  { lang: "Python", name: "BrokenPipeError", test: /BrokenPipeError/, rank: 2, title: "管道的另一端已经关了",
    meaning: "你还在往管道写，读的那一端已经退出。",
    look: "常见于输出被 head 之类提前结束。确认后面还要不要继续写。",
    points: [
      { term: "管道", text: "一个程序的输出接到另一个程序的输入。" },
      { term: "写早停的管道", text: "对方不读了，你再写就会断。" }
    ] },
  { lang: "Python", name: "ConnectionAbortedError", test: /ConnectionAbortedError/, title: "连接被中止了",
    meaning: "连接在完成前被系统或对方中止。",
    look: "看网络是否中断，对方程序是否崩溃。可以重试一次连接。",
    points: [
      { term: "中止", text: "连接没正常走完就被掐断。" },
      { term: "重试要有限", text: "可以再连，但不要无限紧循环重试。" }
    ] },
  { lang: "Python", name: "ConnectionResetError", test: /ConnectionResetError/, title: "连接被对方重置了",
    meaning: "对方突然重置了这条连接。",
    look: "看服务是否重启、超时或主动断开。",
    points: [
      { term: "重置", text: "对方用重置告诉你这条连接作废。" },
      { term: "不要假设还连着", text: "重置之后要重新建立连接，旧连接不能接着用。" }
    ] },
  { lang: "Python", name: "FileExistsError", test: /FileExistsError/, title: "这个文件或目录已经存在",
    meaning: "创建时目标已经在了，而你没有允许覆盖。",
    look: "换一个名字，或先判断存在再决定删除、覆盖还是跳过。",
    points: [
      { term: "exist_ok", text: "创建目录时可以指定已存在就不报错。先确认这是你想要的。" },
      { term: "不要盲目覆盖", text: "已存在可能是重要文件。先看清楚再决定替换。" }
    ] },
  { lang: "Python", name: "InterruptedError", test: /InterruptedError/, title: "系统调用被信号打断了",
    meaning: "一次系统调用做到一半，被信号打断。",
    look: "看当时有没有信号处理器。有的操作可以重试。",
    points: [
      { term: "信号", text: "操作系统用来通知进程的一种方式。" },
      { term: "系统调用", text: "像读文件这样的请求，有时会被信号中途打断。" }
    ] },
  { lang: "Python", name: "ProcessLookupError", test: /ProcessLookupError/, title: "找不到这个进程",
    meaning: "你给出的进程号不存在。",
    look: "确认 pid 没有写错，进程是不是已经退出。",
    points: [
      { term: "pid", text: "进程编号。进程结束后编号可能被别人重用，也可能直接无效。" },
      { term: "先检查", text: "发信号或等待之前，先确认进程还在。" }
    ] },
  { lang: "Python", name: "weakly-referenced object no longer exists", test: /weakly-referenced object no longer exists/, title: "弱引用指向的对象已经没了",
    meaning: "weakref 引用的对象已被回收，不能再取出来。",
    look: "这和「名字没定义」不是一回事。对象已经不在了。",
    points: [
      { term: "弱引用", text: "不阻止对象被回收的引用。对象没了，引用就空了。" },
      { term: "别当成 NameError", text: "这里是对象被回收，不是变量名写错。" }
    ] },
  { lang: "Python", name: "BufferError", test: /BufferError/, title: "缓冲区操作失败了",
    meaning: "对内存缓冲做了当前状态不允许的操作。",
    look: "看是不是在导出缓冲区时对象正被修改，或操作不支持。",
    points: [
      { term: "缓冲区", text: "一块给底层读写用的内存视图。" },
      { term: "状态不对", text: "对象正在变化时，缓冲区可能不允许再导出。" }
    ] },
  { lang: "Python", name: "expected an indented block", test: /expected an indented block/, rank: 2, title: "这里应该有缩进的代码块",
    meaning: "冒号下面没有写上属于它的语句。",
    look: "在 if、for、def、class 的下一行缩进，至少写一条语句。暂时用 pass 也可以。",
    points: [
      { term: "代码块", text: "冒号后面缩进的那一段，才是属于它的身体。" },
      { term: "pass", text: "身体还没想好时，可以先写 pass，表示这里暂时为空。" }
    ] },
  { lang: "Python", name: "unindent does not match", test: /unindent does not match/, rank: 2, title: "缩进退回的位置对不上",
    meaning: "退格之后的空白，没有对齐到外面任何一层。",
    look: "用同一种空白。退回时要对齐外层 if 或函数开头。",
    points: [
      { term: "退回缩进", text: "代码块结束时要回到外层的列。" },
      { term: "不要混空格和 Tab", text: "混用时，看起来齐，计数却对不上。" }
    ] },
  { lang: "Python", name: "unexpected indent", test: /unexpected indent/, rank: 2, title: "这行不该多缩进",
    meaning: "这一行突然比它所属的位置更靠右，又没有新的冒号块。",
    look: "看上一行有没有冒号。没有的话，把这行退回到和上一行对齐。",
    points: [
      { term: "突然缩进", text: "只有冒号开启的块，下一行才应该更靠右。" },
      { term: "对齐上一层", text: "同一层语句左边空白要一样多。" }
    ] },
  { lang: "Python", name: "return outside function", test: /return outside function/, title: "return 写在了函数外面",
    meaning: "return 只能出现在函数里。",
    look: "把它移进 def 里面，或如果只是想结束脚本，不要用 return。",
    points: [
      { term: "return", text: "把值交回给调用方，并结束这个函数。" },
      { term: "脚本顶层", text: "文件最外层没有函数可返回。" }
    ] },
  { lang: "Python", name: "break outside loop", test: /break outside loop/, title: "break 写在了循环外面",
    meaning: "break 只能用来离开 for 或 while。",
    look: "移进循环，或删掉它。",
    points: [
      { term: "break", text: "立刻结束当前这一层循环。" },
      { term: "必须在循环里", text: "写在函数末尾或 if 外面单独放着是不合法的。" }
    ] },
  { lang: "Python", name: "continue not properly in loop", test: /continue not properly in loop/, title: "continue 没有落在循环里",
    meaning: "continue 的位置不在 for 或 while 内部。",
    look: "移进循环再使用。",
    points: [
      { term: "continue", text: "跳过本轮剩余语句，进入下一轮。" },
      { term: "位置", text: "它必须属于某个循环，不能单独出现。" }
    ] },
  { lang: "Python", name: "yield outside function", test: /yield outside function/, title: "yield 写在了函数外面",
    meaning: "yield 只能出现在函数里，用来做生成器。",
    look: "把这段放进 def。调用那个函数才会得到生成器。",
    points: [
      { term: "yield", text: "暂停函数并交出一个值，下次再从这里继续。" },
      { term: "生成器函数", text: "含有 yield 的函数，调用时不会立刻跑完。" }
    ] },
  { lang: "Python", name: "unmatched ')'", test: /unmatched '\)'/, rank: 2, title: "这个右小括号没有配对",
    meaning: "多了一个 )，或者前面少了 (。",
    look: "从报错位置往左数括号。字符串里的括号不要算进去。",
    points: [
      { term: "小括号", text: "函数调用和表达式分组都用它。左右要成对。" },
      { term: "从里往外", text: "先看最里面的一对，再看外面。" }
    ] },
  { lang: "Python", name: "unmatched ']'", test: /unmatched '\]'/, rank: 2, title: "这个右中括号没有配对",
    meaning: "多了一个 ]，或前面的 [ 没写。",
    look: "核对列表、下标和切片的括号。",
    points: [
      { term: "中括号", text: "列表、下标、切片都用它。" },
      { term: "成对", text: "每一个 [ 都应有一个 ]。" }
    ] },
  { lang: "Python", name: "can't assign to literal", test: /can't assign to literal/, rank: 2, title: "不能给字面量赋值",
    meaning: "等号左边写成了数字、字符串这类常量。",
    look: "左边必须是变量名。想比较相等要用 ==。",
    points: [
      { term: "赋值的左边", text: "要是一个能装值的名字。" },
      { term: "比较用 ==", text: "1 = 2 不合法。比较要写成 1 == 2。" }
    ] },
  { lang: "Python", name: "cannot assign to function call", test: /can(?:not|'t) assign to function call/, rank: 2, title: "不能给函数调用赋值",
    meaning: "等号左边写成了函数调用。",
    look: "如果要收返回值，写成 变量 = 函数()。不要写成 函数() = 值。",
    points: [
      { term: "调用是结果", text: "函数() 会算出一个值，这个值本身不能当变量名。" },
      { term: "先放进变量", text: "名字写在左边，调用写在右边。" }
    ] },
  { lang: "Python", name: "cannot assign to attribute here", test: /can(?:not|'t) assign to attribute/, rank: 2, title: "这个属性现在不能赋值",
    meaning: "对属性赋值的位置或对象状态不允许。",
    look: "看左边是不是 None，或是不是只读属性。",
    points: [
      { term: "属性赋值", text: "对象.字段 = 值 要求对象存在，而且字段允许写。" },
      { term: "只读", text: "有的属性只能读，赋值会被拒绝。" }
    ] },
  { lang: "Python", name: "f-string: expecting '}'", test: /f-string: expecting '\}'/, rank: 2, title: "f 字符串少了右花括号",
    meaning: "花括号里的表达式没有用 } 结束。",
    look: "每个 {表达式} 都要关上。想输出真正的花括号时写成 {{。",
    points: [
      { term: "f 字符串", text: "在字符串里用花括号嵌入表达式。" },
      { term: "双写花括号", text: "要显示 { 本身时，写成 {{，不是单个 {。" }
    ] },
  { lang: "Python", name: "f-string: single '}' is not allowed", test: /f-string: single '\}' is not allowed/, rank: 2, title: "f 字符串里多了一个右花括号",
    meaning: "出现了单独的 }，它没有对应的 {。",
    look: "删掉多余的 }，或把要显示的 } 写成 }}。",
    points: [
      { term: "花括号成对", text: "嵌入表达式必须 { 开头、} 结束。" },
      { term: "要显示括号", text: "输出一个右花括号时写成 }}。" }
    ] },
  { lang: "Python", name: "leading zeros in decimal integer literals are not permitted", test: /leading zeros in decimal integer literals are not permitted/, rank: 2, title: "十进制数字不能用多余的前导 0",
    meaning: "写成了 012 这种旧式写法，Python 3 不允许。",
    look: "去掉多余的 0。八进制要写成 0o12。",
    points: [
      { term: "前导 0", text: "012 不是十进制 12。这种写法已被禁止。" },
      { term: "八进制", text: "需要八进制时写成 0o 开头。" }
    ] },
  { lang: "Python", name: "unexpected character after line continuation", test: /unexpected character after line continuation/, rank: 2, title: "续行符后面还有别的字符",
    meaning: "行尾的 \\ 后面不是立刻换行，还有空格或其他字符。",
    look: "让 \\ 成为这一行最后一个字符，后面不要有空格。",
    points: [
      { term: "续行", text: "行尾一个 \\ 表示这一句到下一行还没完。" },
      { term: "后面要干净", text: "\\ 和换行之间不能夹别的字符。" }
    ] },
  { lang: "Python", name: "invalid syntax. Perhaps you forgot a comma", test: /invalid syntax\. Perhaps you forgot a comma/, rank: 2, title: "这里可能少了逗号",
    meaning: "解释器猜你在列表、参数或字典里漏了逗号。",
    look: "看它指出的两个相邻项，中间补上逗号。",
    points: [
      { term: "逗号分隔", text: "多项参数、列表元素之间用逗号。" },
      { term: "提示只是猜测", text: "它说 perhaps。先看是不是逗号，也可能是别的符号问题。" }
    ] },
  { lang: "Python", name: "did you forget parentheses", test: /Missing parentheses in call to 'print'|did you forget parentheses/, rank: 2, title: "print 可能少了括号",
    meaning: "写了 Python 2 风格的 print x，Python 3 不接受。",
    look: "改成 print(x)。",
    points: [
      { term: "print 是函数", text: "Python 3 里 print 必须调用，要有括号。" },
      { term: "参数放进括号", text: "print(\"你好\")，不要写成 print \"你好\"。" }
    ] },
  { lang: "Python", name: "no binding for nonlocal", test: /'nonlocal' declaration not allowed at module level|no binding for nonlocal/, rank: 2, title: "这里不能用 nonlocal",
    meaning: "nonlocal 写在了模块顶层，或外面没有这个变量。",
    look: "nonlocal 只能用在嵌套函数里，指向外面一层函数已经有的变量。模块全局用 global。",
    points: [
      { term: "nonlocal", text: "指向上一层函数里的变量，不是全局。" },
      { term: "global", text: "要改模块级变量时用 global。" }
    ] },
  { lang: "Python", name: "name 'x' is parameter and global", test: /name '.+' is parameter and global/, rank: 2, title: "同一个名字既是参数又被声明为 global",
    meaning: "参数名和 global 声明撞在一起了。",
    look: "换一个变量名，或去掉冲突的 global。",
    points: [
      { term: "参数", text: "函数自己的局部名字。" },
      { term: "global", text: "声明这个名字指向模块全局。两个角色不能是同一个名字。" }
    ] },
  { lang: "Python", name: "annotated name 'x' can't be global", test: /annotated name '.+' can't be global/, rank: 2, title: "带注解的名字不能这样声明 global",
    meaning: "变量注解和 global 的用法冲突了。",
    look: "把注解和 global 的职责拆开，别压在同一个名字的错误位置上。",
    points: [
      { term: "注解", text: "名字: 类型 这种写法是注解。" },
      { term: "global 的限制", text: "它有自己的语法位置，不能和注解随便叠在一起。" }
    ] },
  { lang: "Python", name: "invalid decimal literal", test: /invalid decimal literal/, rank: 2, title: "这个数字字面量不合法",
    meaning: "数字里混进了不该出现的字符，或写法断了。",
    look: "看数字中间有没有字母、中文符号或两个小数点。",
    points: [
      { term: "字面量", text: "直接写在代码里的数字。" },
      { term: "下划线", text: "长数字可以用 1_000 分组，但不能乱插别的符号。" }
    ] },
  { lang: "Python", name: "bytes can only contain ASCII literal characters", test: /bytes can only contain ASCII literal characters/, rank: 2, title: "bytes 字面量里有非 ASCII 字符",
    meaning: "b\"...\" 里写进了中文或超出 ASCII 的字符。",
    look: "字节串只放 ASCII。文字用普通字符串，需要字节时再 encode。",
    points: [
      { term: "bytes", text: "一串字节，不是一串任意文字。" },
      { term: "encode", text: "文字变成字节要用指定编码，例如 \"你好\".encode(\"utf-8\")。" }
    ] },
  { lang: "Python", name: "cannot mix bytes and nonbytes", test: /can't concat bytes to str|cannot mix bytes and nonbytes/, rank: 2, title: "字节和字符串混在一起了",
    meaning: "一边是 bytes，一边是 str，不能直接拼或比较。",
    look: "先统一成同一种。文本用 str，二进制用 bytes。",
    points: [
      { term: "str 和 bytes", text: "一个是文字，一个是字节。不能直接拼。" },
      { term: "解码或编码", text: "bytes 用 decode 变文字，文字用 encode 变字节。" }
    ] },
  { lang: "Python", name: "sequence index must be integers", test: /(?:sequence index|slice indices) must be integers/, rank: 2, title: "下标必须是整数",
    meaning: "用了小数或其他类型做序列下标。",
    look: "把下标改成 int。不要用 float 去取列表元素。",
    points: [
      { term: "下标", text: "位置必须是整数，从 0 开始。" },
      { term: "切片也一样", text: "切片的起点和终点同样要是整数或留空。" }
    ] },
  { lang: "Python", name: "pop from empty list", test: /pop from empty list/, rank: 2, title: "空列表不能再弹出",
    meaning: "对空 list 调用了 pop。",
    look: "弹出前先看列表是否为空。",
    points: [
      { term: "pop", text: "取走最后一个或指定位置的元素。" },
      { term: "空列表", text: "一个元素都没有时，没有可取的东西。" }
    ] },
  { lang: "Python", name: "list assignment index out of range", test: /list assignment index out of range/, rank: 2, title: "给列表这个位置赋值越界了",
    meaning: "a[i] = 值 时，i 超出了现有长度。赋值不会自动把列表变长。",
    look: "要加新元素用 append。改已有位置时，下标必须已经存在。",
    points: [
      { term: "赋值不等于追加", text: "a[100] = 1 不会帮你补出前面的空位。" },
      { term: "append", text: "在末尾新增元素用 append。" }
    ] },
  { lang: "Python", name: "dictionary update sequence element", test: /dictionary update sequence element/, rank: 2, title: "拿去更新字典的序列格式不对",
    meaning: "dict.update 收到的每一项不能拆成一对键值。",
    look: "传入键值对的列表，例如 [(键, 值)]，或另一个字典。",
    points: [
      { term: "update", text: "用别的数据更新这个字典。" },
      { term: "每一项两格", text: "从序列更新时，每一项都要能拆成键和值。" }
    ] },
  { lang: "Python", name: "'NoneType' object is not iterable", test: /'NoneType' object is not iterable/, rank: 2, title: "None 不能被遍历",
    meaning: "for 或 list() 用在了 None 上。函数可能没有返回列表。",
    look: "先看那个值是不是 None。让函数返回空列表，而不是什么都不返回。",
    points: [
      { term: "None", text: "函数没有 return 时，结果就是 None。" },
      { term: "空列表", text: "表示没有元素，但仍然可以遍历。它和 None 不同。" }
    ] },
  { lang: "Python", name: "'NoneType' object is not subscriptable", test: /'NoneType' object is not subscriptable/, rank: 2, title: "None 不能用方括号取",
    meaning: "对 None 写了 [下标]，多半是前面的查找返回了 None。",
    look: "先判断不是 None，再取下标。",
    points: [
      { term: "方括号", text: "用来取元素。左边必须是列表、字典、字符串这类。" },
      { term: "返回值", text: "很多查找失败时会返回 None，而不是空容器。" }
    ] },
  { lang: "Python", name: "maximum recursion depth exceeded", test: /maximum recursion depth exceeded/, rank: 2, title: "递归层数超过上限了",
    meaning: "函数一直调用自己，没有在到达上限前停下来。",
    look: "检查递归有没有走到结束条件，参数有没有变小。",
    points: [
      { term: "递归上限", text: "Python 会限制调用栈深度，防止无限递归拖垮进程。" },
      { term: "结束条件", text: "每次调用都要更接近结束，否则会一直叠下去。" }
    ] },
  { lang: "Python", name: "division by zero", test: /(?<!warning: )division by zero/, rank: 2, title: "除数是 0",
    meaning: "做了除法或取余，右边是 0。",
    look: "除之前判断除数。为 0 时不要除。",
    points: [
      { term: "除法", text: "右边是 0 时没有数学结果，解释器会停。" },
      { term: "取余也一样", text: "% 的右边同样不能是 0。" }
    ] },
  { lang: "Python", name: "local variable referenced before assignment", test: /local variable referenced before assignment/, rank: 2, title: "局部变量在赋值前就被使用了",
    meaning: "函数里给这个名字赋值过，于是它被当成局部变量，但用的时候还没赋到。",
    look: "把赋值移到使用之前，或如果你想用全局变量，先想清楚是不是真的要 global。",
    points: [
      { term: "局部优先", text: "函数里只要给名字赋过值，这个名字就是局部的。" },
      { term: "先赋值", text: "读取必须发生在这条路径上的赋值之后。" }
    ] },
  { lang: "Python", name: "cannot import name", test: /cannot import name/, rank: 2, title: "模块里没有这个名字",
    meaning: "模块找到了，但 import 的那个函数或类不在里面。",
    look: "对照模块里真实的名字。也可能是循环导入导致模块还没初始化完。",
    points: [
      { term: "from import", text: "from 模块 import 名字。名字必须已经定义在那个模块里。" },
      { term: "循环导入", text: "两个文件互相 import 时，其中一个可能还没把名字创建出来。" }
    ] },
  { lang: "Python", name: "partially initialized module", test: /partially initialized module|circular import/, rank: 2, title: "模块初始化到一半又被导入了",
    meaning: "几乎总是循环导入。模块还没跑完，又被对方导入。",
    look: "把互相引用拆开。把导入移进函数里，或抽出第三个模块放共享代码。",
    points: [
      { term: "循环导入", text: "A 导入 B 的同时，B 又导入 A。" },
      { term: "初始化顺序", text: "模块从上到下执行。执行到一半时，下面的名字还不存在。" }
    ] },
  { lang: "Python", name: "bad magic number in", test: /bad magic number in/, rank: 2, title: "这个 pyc 和当前解释器不匹配",
    meaning: "编译过的字节码是另一个 Python 版本留下的。",
    look: "删掉 __pycache__，用现在的解释器重新运行。",
    points: [
      { term: "pyc", text: "Python 把模块编译后的缓存。" },
      { term: "版本", text: "不同大版本的字节码不能混用。" }
    ] },
  { lang: "Python", name: "Permission denied", test: /Permission denied/, rank: 2, title: "没有权限访问这个路径",
    meaning: "操作系统拒绝读取、写入或执行。",
    look: "看路径是不是系统目录。换到你有权限的目录，或调整权限。",
    points: [
      { term: "权限", text: "读、写、执行是分开的。能看不等于能改。" },
      { term: "工作目录", text: "相对路径取决于你从哪个目录启动程序。" }
    ] },
  { lang: "Python", name: "externally-managed-environment", test: /externally-managed-environment/, rank: 2, title: "这个 Python 环境不允许直接 pip 安装",
    meaning: "系统 Python 被标记为外部管理，直接 pip 会破坏系统包。",
    look: "改用虚拟环境，在环境里再 pip install。",
    points: [
      { term: "虚拟环境", text: "给这个项目单独一个 Python 环境，不碰系统自带的。" },
      { term: "系统 Python", text: "操作系统自己依赖它。随便装包可能把它弄坏。" }
    ] },
  { lang: "Python", name: "Could not find a version that satisfies", test: /Could not find a version that satisfies/, rank: 2, title: "pip 找不到满足条件的版本",
    meaning: "包名写错、版本号不存在，或当前 Python 版本不被这个包支持。",
    look: "核对包名拼写和 python 版本。先升级 pip 再试。",
    points: [
      { term: "包名", text: "必须是索引上真实存在的名字。差一个字母就找不到。" },
      { term: "Python 版本", text: "有的包不支持太旧或太新的解释器。" }
    ] },
  { lang: "Python", name: "CERTIFICATE_VERIFY_FAILED", test: /CERTIFICATE_VERIFY_FAILED/, rank: 2, title: "证书验证失败了",
    meaning: "HTTPS 证书不被信任。可能是自签证书、过期，或本机证书库不完整。",
    look: "先确认网站证书是否正常。不要为了省事在正式环境关掉验证。",
    points: [
      { term: "证书", text: "用来证明对面的服务器是它声称的那一个。" },
      { term: "验证", text: "失败就不要把连接当成安全的。先查原因。" }
    ] },
  { lang: "Python", name: "object has no attribute", test: /(?<!'NoneType' )object has no attribute/, rank: 2, title: "这个对象没有这个属性",
    meaning: "点出来的名字不在对象上。可能是拼写错，或类型不是你以为的那个。",
    look: "先打印 type(对象) 和 dir 里有没有这个名字。",
    points: [
      { term: "属性", text: "对象身上的名字，可能是数据或方法。" },
      { term: "类型先确认", text: "类型不对时，后面的名字一定对不上。" }
    ] },
  { lang: "Python", name: "unhashable type", test: /unhashable type/, rank: 2, title: "这个对象不能当字典的键或放进集合",
    meaning: "dict 的键和 set 的元素必须能算出哈希。list、dict 本身不行。",
    look: "改用元组、字符串或数字当键。需要改内容的数据不要直接当键。",
    points: [
      { term: "哈希", text: "字典靠它快速找到键。会变的对象通常不能当键。" },
      { term: "元组可以", text: "不会改的一组值可以写成元组再当键。" }
    ] },
  { lang: "Python", name: "not all arguments converted during string formatting", test: /not all arguments converted during string formatting/, rank: 2, title: "格式化字符串和参数对不上",
    meaning: "% 格式化时，占位符数量和后面给的值不一致。",
    look: "数一数 %s、%d 有几个，后面的元组就给几个。",
    points: [
      { term: "% 格式化", text: "字符串里的 %s 会按顺序吃掉后面的值。" },
      { term: "个数要一致", text: "多给或少给都会失败。也可以改用 format 或 f 字符串。" }
    ] },
  { lang: "Python", name: "'float' object cannot be interpreted as an integer", test: /'float' object cannot be interpreted as an integer/, rank: 2, title: "这里要整数，却给了小数",
    meaning: "range、切片等不接受 float。",
    look: "先用 int() 取整，并确认这是你想要的。",
    points: [
      { term: "range", text: "range 的参数必须是整数。" },
      { term: "小数", text: "3.0 也是 float，不会自动当成 3。" }
    ] },
  { lang: "Python", name: "I/O operation on closed file", test: /I\/O operation on closed file/, rank: 2, title: "文件已经关掉了还在读写",
    meaning: "close 之后又 read 或 write。",
    look: "把读写放在关闭之前。用 with 可以自动在块结束时关闭。",
    points: [
      { term: "close", text: "关掉之后，这个文件对象不能再读写。" },
      { term: "with", text: "with open(...) as f: 块里面读写，离开块再关。" }
    ] },
  { lang: "Python", name: "'await' outside function", test: /'await' outside function/, rank: 2, title: "await 写在了函数外面",
    meaning: "await 只能写在 async 函数里面。",
    look: "把这段放进 async def，或在支持顶层 await 的环境里再确认语法。",
    points: [
      { term: "await", text: "用来等待一个异步结果。" },
      { term: "async def", text: "普通 def 和文件顶层默认不能写 await。" }
    ] },
  { lang: "Python", name: "cannot reuse already awaited coroutine", test: /cannot reuse already awaited coroutine/, rank: 2, title: "这个协程已经 await 过了",
    meaning: "同一个协程对象不能等待第二次。",
    look: "需要再跑一遍，就重新调用那个 async 函数，得到新的协程。",
    points: [
      { term: "协程", text: "async 函数调用后得到的对象。await 会把它跑完。" },
      { term: "不能重复用", text: "跑完的协程不会再产出一次。要新的就再调用函数。" }
    ] },
  { lang: "Python", name: "set changed size during iteration", test: /set changed size during iteration/, rank: 2, title: "遍历集合时改了它的大小",
    meaning: "一边 for 遍历 set，一边增加或删除元素。",
    look: "先把元素抄到 list 里再遍历，或循环结束后再改。",
    points: [
      { term: "set", text: "不重复元素的容器。" },
      { term: "遍历时别改大小", text: "和字典一样，边走边增删会让内部结构乱掉。" }
    ] },
  { lang: "Python", name: "unsupported format string passed to NoneType.__format__", test: /unsupported format string passed to .+\.__format__/, rank: 2, title: "这个对象不支持这种格式化",
    meaning: "format 或 f 字符串里用了对象不认识的格式说明。",
    look: "看冒号后面的格式。换一种这个类型支持的写法。",
    points: [
      { term: "格式说明", text: "像 :.2f 表示保留两位小数。不是每种对象都接受。" },
      { term: "先变类型", text: "需要数字格式时，先确认它真的是数字。" }
    ] },
  { lang: "Python", name: "argument of type 'X' is not iterable", test: /argument of type '.+' is not iterable/, rank: 2, title: "in 右边的对象不能被逐个查看",
    meaning: "写了 x in 某个值，但那个值不能迭代。常见是 None。",
    look: "先确认右边是列表、字符串或元组，而不是 None。",
    points: [
      { term: "in", text: "用来问一个元素在不在里面。右边要能被逐个看。" },
      { term: "None", text: "None 不是容器。查找失败时不要直接拿 None 去 in。" }
    ] },
  { lang: "Python", name: "must be str, not", test: /must be str, not/, rank: 2, title: "这里必须是字符串",
    meaning: "函数要求 str，你给了别的类型。",
    look: "用 str() 转成文字，或改用接受那种类型的函数。",
    points: [
      { term: "str", text: "文字类型。数字要先变成文字才能和文字拼接或写入某些接口。" },
      { term: "别混用", text: "路径、编码、拼接之前，先看参数要的是 str 还是 bytes。" }
    ] },
  { lang: "Python", name: "can't multiply sequence by non-int of type", test: /can't multiply sequence by non-int of type/, rank: 2, title: "序列不能乘以非整数",
    meaning: "列表或字符串乘了一个小数或非数字。",
    look: "乘数改成整数。需要重复几次，就给整数次数。",
    points: [
      { term: "序列乘法", text: "\"a\" * 3 得到 aaa。乘数必须是整数。" },
      { term: "小数不行", text: "\"a\" * 1.5 没有定义。" }
    ] },
  { lang: "Python", name: "from __future__ imports must occur at the beginning", test: /from __future__ imports must occur at the beginning/, rank: 2, title: "__future__ 导入必须放在文件最前面",
    meaning: "from __future__ import 写得太靠后了。",
    look: "把它移到文件开头，放在其他代码之前。文档字符串可以在它前面。",
    points: [
      { term: "__future__", text: "用来打开某一版语言里后来才默认的行为。" },
      { term: "位置固定", text: "解释器要求它出现在真正的代码之前。" }
    ] },
  { lang: "Python", name: "encoding declaration in Unicode string", test: /(?:encoding declaration|Non-UTF-8 code starting)/, rank: 2, title: "编码声明和文件实际编码冲突",
    meaning: "文件里写了 coding 声明，但文件字节和这个声明对不上。",
    look: "让文件保存编码和第一行声明一致，通常都用 UTF-8。",
    points: [
      { term: "编码声明", text: "类似 # -*- coding: utf-8 -*-。" },
      { term: "保存格式", text: "编辑器另存为的编码，要和声明一致。" }
    ] },
  { lang: "JavaScript", name: "Cannot use import statement outside a module", test: /Cannot use import statement outside a module/, title: "import 用在了模块外面",
    meaning: "这个文件没有被当成 ES 模块，却写了 import。",
    look: "用 type=module 的 script，或把包设置成 module。CommonJS 环境改用 require，或按文档改成 import。",
    points: [
      { term: "import", text: "ES 模块的引入写法。普通脚本里不能直接用。" },
      { term: "模块模式", text: "浏览器给 script 加 type=\"module\"。Node 则要在 package.json 里声明 type 为 module。" }
    ] },
  { lang: "JavaScript", name: "Cannot use import.meta outside a module", test: /Cannot use import\.meta outside a module/, rank: 2, title: "import.meta 只能在模块里用",
    meaning: "当前文件不是 ES 模块。",
    look: "把文件改成模块再使用 import.meta，或换一种取路径的方式。",
    points: [
      { term: "import.meta", text: "模块自己的信息，例如 import.meta.url。" },
      { term: "先成为模块", text: "普通脚本没有这份信息。" }
    ] },
  { lang: "JavaScript", name: "require is not defined", test: /require is not defined/, rank: 2, title: "这里没有 require",
    meaning: "在浏览器或 ES 模块里使用了 Node 的 require。",
    look: "浏览器里改用 import 或 script 标签。Node 的 CommonJS 文件才能 require。",
    points: [
      { term: "require", text: "CommonJS 的加载方式，属于 Node 的一种模块系统。" },
      { term: "环境不同", text: "浏览器默认没有 require。不要把 Node 代码直接贴进页面。" }
    ] },
  { lang: "JavaScript", name: "document is not defined", test: /document is not defined/, rank: 2, title: "这里没有 document",
    meaning: "在没有页面文档的环境里用了 document，常见是 Node。",
    look: "操作页面的代码放到浏览器里跑。Node 脚本不要碰 document。",
    points: [
      { term: "document", text: "浏览器里整份 HTML 文档的对象。" },
      { term: "Node 没有页面", text: "Node 是跑脚本的，默认没有网页 DOM。" }
    ] },
  { lang: "JavaScript", name: "window is not defined", test: /window is not defined/, rank: 2, title: "这里没有 window",
    meaning: "在 Node 或其他没有浏览器窗口的环境里用了 window。",
    look: "浏览器专用的代码不要在 Node 里直接跑。需要全局对象时先分清环境。",
    points: [
      { term: "window", text: "浏览器里的全局对象。" },
      { term: "环境", text: "Node 的全局对象不是 window。" }
    ] },
  { lang: "JavaScript", name: "localStorage is not defined", test: /localStorage is not defined/, rank: 2, title: "这里没有 localStorage",
    meaning: "当前环境不提供浏览器的本地存储。",
    look: "在浏览器页面里使用。无痕或禁用存储时也可能失败，那是另一种报错。",
    points: [
      { term: "localStorage", text: "浏览器提供的一小块本地键值存储。" },
      { term: "不是所有环境都有", text: "Node、部分测试环境默认没有它。" }
    ] },
  { lang: "JavaScript", name: "process is not defined", test: /process is not defined/, rank: 2, title: "这里没有 process",
    meaning: "浏览器里使用了 Node 才有的 process。",
    look: "读取环境变量等 Node 能力要放在服务端。前端不要直接用 process。",
    points: [
      { term: "process", text: "Node 里代表当前进程的对象。" },
      { term: "前后端分开", text: "打包工具有时会替换 process.env，但浏览器本身没有 process。" }
    ] },
  { lang: "JavaScript", name: "Cannot access 'x' before initialization", test: /Cannot access '.+' before initialization/, rank: 2, title: "变量在初始化之前就被用了",
    meaning: "let 或 const 已经在这个块里，但还没执行到声明那一行。",
    look: "把使用挪到声明之后。不要在声明前的同一块里读它。",
    points: [
      { term: "暂时性死区", text: "从块开始到声明执行之间，这个名字存在但不能用。" },
      { term: "先声明", text: "写完 let 或 const 那一行之后，才能读它。" }
    ] },
  { lang: "JavaScript", name: "Unexpected token '<'", test: /Unexpected token '<'/, rank: 2, title: "这里不该出现小于号，多半收到了 HTML",
    meaning: "解析 JS 或 JSON 时碰到 <。常见是接口返回了网页，而不是数据。",
    look: "打开实际响应。如果开头是 <!DOCTYPE 或 <html，说明地址、代理或登录跳转给了页面。",
    points: [
      { term: "小于号", text: "JSON 和普通脚本语句不会以 <html 开头。" },
      { term: "先看响应正文", text: "状态码 200 也可能是一份错误页。" }
    ] },
  { lang: "JavaScript", name: "undefined is not an object", test: /undefined is not an object/, rank: 2, title: "空值被当成对象用了",
    meaning: "Safari 在你对 undefined 取属性时这样说。",
    look: "先判断左边有值，再点属性。",
    points: [
      { term: "和 Chrome 的说法不同", text: "Chrome 常说 Cannot read properties of undefined。意思同样是左边是空的。" },
      { term: "先看左边", text: "a.b 失败时先看 a。" }
    ] },
  { lang: "JavaScript", name: "null is not an object", test: /null is not an object/, rank: 2, title: "null 被当成对象用了",
    meaning: "对 null 取了属性或下标。",
    look: "找到这个 null 从哪来。调用前先判断。",
    points: [
      { term: "null", text: "明确表示没有对象。" },
      { term: "可选调用要先判断", text: "不能假设查找结果一定是对象。" }
    ] },
  { lang: "JavaScript", name: "undefined is not a function", test: /undefined is not a function/, rank: 2, title: "你调用的值是 undefined",
    meaning: "括号左边的结果是 undefined，不能当函数执行。",
    look: "打印那个名字。可能是方法名写错，或对象上根本没有这个函数。",
    points: [
      { term: "调用", text: "f() 要求 f 是函数。undefined() 一定会失败。" },
      { term: "方法名", text: "obj.foo 写错时，取到的就是 undefined。" }
    ] },
  { lang: "JavaScript", name: "Unexpected reserved word", test: /Unexpected reserved word/, rank: 2, title: "这里不能使用保留字",
    meaning: "把 class、await、yield 等词放在了当前模式不允许的位置。",
    look: "看那个词是不是关键字。换一个变量名，或把 await 放进 async 函数。",
    points: [
      { term: "保留字", text: "语言自己要占用的词，不能随便当变量名。" },
      { term: "严格模式更严", text: "有些词只在严格模式或模块里有特殊含义。" }
    ] },
  { lang: "JavaScript", name: "Unexpected string", test: /Unexpected string/, rank: 2, title: "字符串出现的位置不对",
    meaning: "两个字符串或语句贴在一起，中间缺少逗号或运算符。",
    look: "看这个字符串前面。参数之间要有逗号。",
    points: [
      { term: "逗号", text: "函数参数、数组元素要用逗号分开。" },
      { term: "自动分号", text: "有时两行贴成了一句。把语句拆开写清楚。" }
    ] },
  { lang: "JavaScript", name: "Octal literals are not allowed in strict mode", test: /Octal literals are not allowed in strict mode/, title: "严格模式里不能写八进制字面量",
    meaning: "用了 012 这种旧写法。",
    look: "十进制就写成 10。真要八进制用 0o12。",
    points: [
      { term: "严格模式", text: "更严格的 JS 规则。模块默认就是严格模式。" },
      { term: "前导 0", text: "012 不是十进制 12。严格模式直接禁止。" }
    ] },
  { lang: "JavaScript", name: "Delete of an unqualified identifier in strict mode", test: /Delete of an unqualified identifier in strict mode/, rank: 2, title: "不能这样删除变量",
    meaning: "严格模式里对裸变量使用了 delete。",
    look: "delete 用来删对象属性，不要用它删 let、const 或 var。",
    points: [
      { term: "delete", text: "删除对象的某个属性。" },
      { term: "变量不是属性删除", text: "想丢掉一个局部变量，让它离开作用域即可，不要 delete。" }
    ] },
  { lang: "JavaScript", name: "Missing initializer in destructuring declaration", test: /Missing initializer in destructuring declaration/, rank: 2, title: "解构时少了要拆的值",
    meaning: "解构声明没有给出右边的对象或数组。",
    look: "写成 const { a } = 对象。右边不能空着。",
    points: [
      { term: "解构", text: "从对象或数组里按名字或位置取出值。" },
      { term: "右边要有", text: "没有右边，就没有东西可拆。" }
    ] },
  { lang: "JavaScript", name: "Rest element must be last element", test: /Rest element must be last element/, rank: 2, title: "剩余参数必须放在最后",
    meaning: "...rest 后面又写了别的元素或参数。",
    look: "把 ... 的那一项移到参数列表或数组模式的最后。",
    points: [
      { term: "剩余参数", text: "用 ...名字 接住剩下的全部。" },
      { term: "只能有一个在末尾", text: "它会把后面所有位置都吃掉，所以不能再跟别的。" }
    ] },
  { lang: "JavaScript", name: "must not have duplicate parameter names", test: /(?:must not have duplicate parameter|Duplicate parameter name not allowed)/, rank: 2, title: "参数名重复了",
    meaning: "严格模式或箭头函数里，同一个参数名写了两次。",
    look: "每个参数用不同的名字。",
    points: [
      { term: "参数名", text: "用来接传入的值。重复了就不知道该把值放哪。" },
      { term: "严格模式", text: "重复参数在严格模式下直接是语法错误。" }
    ] },
  { lang: "JavaScript", name: "Illegal return statement", test: /Illegal return statement/, title: "这个位置不能 return",
    meaning: "return 出现在函数外面。",
    look: "放进函数里。顶层脚本不能 return。",
    points: [
      { term: "return", text: "把结果交回给调用方。" },
      { term: "必须在函数内", text: "文件最外层没有函数可返回。" }
    ] },
  { lang: "JavaScript", name: "Illegal break statement", test: /Illegal break statement/, title: "break 没有落在循环或 switch 里",
    meaning: "break 写在了它能离开的结构外面。",
    look: "移进 for、while 或 switch，或删掉。",
    points: [
      { term: "break", text: "离开最近的循环或 switch。" },
      { term: "标签", text: "想离开外层时要写带标签的 break，并且标签确实包住它。" }
    ] },
  { lang: "JavaScript", name: "Illegal continue statement", test: /Illegal continue statement/, title: "continue 没有落在循环里",
    meaning: "continue 写在了循环外面。",
    look: "只在 for 或 while 里面使用它。",
    points: [
      { term: "continue", text: "跳过本轮剩余部分。" },
      { term: "必须属于循环", text: "没有循环就没有下一轮。" }
    ] },
  { lang: "JavaScript", name: "Must call super constructor in derived class", test: /Must call super constructor in derived class/, rank: 2, title: "子类构造里还没调用 super",
    meaning: "在调用 super() 之前就使用了 this。",
    look: "派生类的 constructor 里，先写 super(...)。",
    points: [
      { term: "super", text: "调用父类构造，把这个对象先建出来。" },
      { term: "this 要等 super 之后", text: "父类还没初始化时，不能用 this。" }
    ] },
  { lang: "JavaScript", name: "super() must be called before accessing 'this'", test: /super\(\) must be called before|Super constructor may only be called once/, rank: 2, title: "访问 this 之前必须先 super",
    meaning: "子类构造函数里顺序错了。",
    look: "把 super() 放到使用 this 之前。",
    points: [
      { term: "构造顺序", text: "先父类，后子类自己的字段。" },
      { term: "只要有 constructor", text: "写了 constructor 的子类就要自己调用 super。" }
    ] },
  { lang: "JavaScript", name: "Private field '#x' must be declared in an enclosing class", test: /Private field '.+' must be declared in an enclosing class/, rank: 2, title: "这个私有字段还没声明",
    meaning: "使用了 #名字，但类里没有声明它。",
    look: "在类身体里先写 #名字。不要对普通对象用私有字段。",
    points: [
      { term: "私有字段", text: "以 # 开头，只在这个类内部能用。" },
      { term: "先声明", text: "没声明的 # 名字不是普通属性，访问会直接失败。" }
    ] },
  { lang: "JavaScript", name: "does not provide an export named", test: /does not provide an export named/, rank: 2, title: "这个模块没有你要的导出",
    meaning: "import 的名字在那个文件里不存在。",
    look: "打开那个模块，看它 export 的名字。默认导出和具名导出不是同一种写法。",
    points: [
      { term: "具名导出", text: "export function foo 要用 import { foo }。" },
      { term: "默认导出", text: "export default 要用 import 名字 from，不要加花括号。" }
    ] },
  { lang: "JavaScript", name: "ERR_INVALID_ARG_TYPE", test: /ERR_INVALID_ARG_TYPE/, title: "参数类型不符合要求",
    meaning: "Node API 收到了错误类型的参数。",
    look: "看报错里 Received 和 expected。把参数改成它要的类型。",
    points: [
      { term: "Node API", text: "内置函数对参数类型有明确要求。" },
      { term: "先看 expected", text: "它会写出想要 string、number 还是函数。" }
    ] },
  { lang: "JavaScript", name: "ERR_INVALID_URL", test: /ERR_INVALID_URL/, title: "这个 URL 不合法",
    meaning: "传给 URL 构造或相关 API 的字符串不是合法地址。",
    look: "补上协议，检查有没有空格和非法字符。",
    points: [
      { term: "URL", text: "通常要有协议，例如 https://。" },
      { term: "不要用空字符串", text: "空的或相对路径在某些 API 里不会自动补全。" }
    ] },
  { lang: "JavaScript", name: "ERR_UNKNOWN_FILE_EXTENSION", test: /ERR_UNKNOWN_FILE_EXTENSION/, title: "Node 不认识这个文件扩展名",
    meaning: "直接运行了 .ts 或其他没有加载器的扩展名。",
    look: "用对应的运行方式，或先编译成 .js。",
    points: [
      { term: "扩展名", text: "Node 默认知道 .js、.json、.node 等。" },
      { term: "TypeScript", text: ".ts 需要 tsx、ts-node 或先编译，不能总当成普通 Node 脚本。" }
    ] },
  { lang: "JavaScript", name: "ERR_UNSUPPORTED_DIR_IMPORT", test: /ERR_UNSUPPORTED_DIR_IMPORT/, title: "不能把目录当成模块来导入",
    meaning: "import 了一个目录，但没有可用的入口文件说明。",
    look: "写到具体文件，或给那个目录配置 exports / index。",
    points: [
      { term: "目录导入", text: "不是每个文件夹都能被 import。" },
      { term: "写明确文件", text: "路径落到真实文件上，少依赖隐式入口。" }
    ] },
  { lang: "JavaScript", name: "ENOTFOUND", test: /\bENOTFOUND\b/, title: "域名没有解析出来",
    meaning: "getaddrinfo 找不到这个主机名。",
    look: "检查主机名拼写和本机网络。",
    points: [
      { term: "DNS", text: "把域名查成地址。查不到就连不上。" },
      { term: "getaddrinfo", text: "系统用来查询地址的接口。失败时常带 ENOTFOUND。" }
    ] },
  { lang: "JavaScript", name: "EPERM", test: /\bEPERM\b/, title: "系统拒绝了这次操作",
    meaning: "权限不够，或操作被策略拦住。",
    look: "看路径和端口。换到有权限的位置，或用允许的方式启动。",
    points: [
      { term: "EPERM", text: "表示操作不被允许，和文件不存在不是一回事。" },
      { term: "权限", text: "读、写、监听都可能因为权限失败。" }
    ] },
  { lang: "JavaScript", name: "EISDIR", test: /\bEISDIR\b/, title: "这是一个目录，却被当成文件",
    meaning: "对目录做了只适用于文件的读取或写入。",
    look: "路径最后一段如果是文件夹，就不要按文件去读。",
    points: [
      { term: "目录", text: "里面还可以有别的文件。它本身不是文件内容。" },
      { term: "看路径", text: "多写或少写一段，文件和目录就会搞反。" }
    ] },
  { lang: "JavaScript", name: "ENOTDIR", test: /\bENOTDIR\b/, title: "路径中间有一段不是目录",
    meaning: "你把一个文件当成了目录，又往下拼路径。",
    look: "逐段看路径。文件后面不能再接子路径。",
    points: [
      { term: "路径分段", text: "每一段除了最后的文件，都应该是目录。" },
      { term: "ENOTDIR", text: "不是目录，所以不能再往下走。" }
    ] },
  { lang: "JavaScript", name: "EEXIST", test: /\bEEXIST\b/, title: "目标已经存在",
    meaning: "创建文件或目录时，那个名字已经有了。",
    look: "换名字，或先判断存在再决定是否覆盖。",
    points: [
      { term: "已存在", text: "创建接口默认可能拒绝覆盖。" },
      { term: "先判断", text: "存在时跳过、改名或明确覆盖，不要撞上了再慌。" }
    ] },
  { lang: "JavaScript", name: "ENOSPC", test: /\bENOSPC\b/, title: "磁盘空间不够了",
    meaning: "写入时设备没有剩余空间。",
    look: "清理磁盘，或换一个有空间的路径。",
    points: [
      { term: "空间", text: "文件要占磁盘。满了就写不进去。" },
      { term: "不是代码语法", text: "这是系统资源用尽。" }
    ] },
  { lang: "JavaScript", name: "EMFILE", test: /\bEMFILE\b/, title: "打开的文件太多了",
    meaning: "进程同时打开的文件句柄达到上限。",
    look: "看有没有打开后忘记关闭的文件或连接。用完就要关。",
    points: [
      { term: "句柄", text: "每个打开的文件或套接字都占一个。" },
      { term: "记得关闭", text: "循环里打开却不关闭，很快就会满。" }
    ] },
  { lang: "JavaScript", name: "EPIPE", test: /\bEPIPE\b/, title: "往已经关闭的管道写了数据",
    meaning: "对方不再读，你还在写。",
    look: "确认下游还在。写之前知道连接或管道是否已结束。",
    points: [
      { term: "管道", text: "输出接到另一个程序的输入。" },
      { term: "对方走了", text: "读的一端关闭后，继续写就会断。" }
    ] },
  { lang: "JavaScript", name: "JavaScript heap out of memory", test: /JavaScript heap out of memory/, title: "JavaScript 堆内存用完了",
    meaning: "对象占的内存超过了 Node 能给的上限。",
    look: "不要一次装下超大数组或无限增长的缓存。",
    points: [
      { term: "堆", text: "对象主要放在这里。" },
      { term: "找增长点", text: "看哪一个数组、缓存或日志在不停变大。" }
    ] },
  { lang: "JavaScript", name: "Cannot set headers after they are sent", test: /Cannot set headers after they are sent|ERR_HTTP_HEADERS_SENT/, rank: 2, title: "响应头已经发出去了还在改",
    meaning: "HTTP 响应开始之后，不能再 setHeader 或重复 end。",
    look: "保证一个请求只发送一次响应。错误分支里不要再写第二次。",
    points: [
      { term: "响应头", text: "状态码和头必须在正文之前定下来。" },
      { term: "只结束一次", text: "res.end 或 res.json 之后，这条响应就结束了。" }
    ] },
  { lang: "JavaScript", name: "write after end", test: /write after end/, title: "流已经结束了还在写",
    meaning: "调用 end 之后又 write。",
    look: "调整顺序：先写完数据，最后再 end。",
    points: [
      { term: "流", text: "一段一段写入的输出。" },
      { term: "end", text: "表示不再写了。之后的 write 会被拒绝。" }
    ] },
  { lang: "JavaScript", name: "has been blocked by CORS policy", test: /has been blocked by CORS policy/, rank: 2, title: "请求被跨域策略拦住了",
    meaning: "页面所在源和接口所在源不同，响应没有允许这个页面访问。",
    look: "这是浏览器的安全限制。要在服务端设置正确的 CORS 头，而不是只改前端拼写。",
    points: [
      { term: "同源", text: "协议、域名、端口都相同才算同一个源。" },
      { term: "CORS", text: "服务器明确允许谁可以读这个响应。浏览器负责检查。" }
    ] },
  { lang: "JavaScript", name: "Content Security Policy", test: /Content Security Policy|Refused to execute inline script|Refused to load the script/, rank: 2, title: "内容安全策略拦住了这段资源",
    meaning: "页面的 CSP 不允许当前这种脚本、样式或连接。",
    look: "看被拒绝的指令，例如 script-src。在策略里放行正确的来源，不要随便关掉。",
    points: [
      { term: "CSP", text: "页面声明自己只信任哪些来源的脚本和资源。" },
      { term: "拦截是故意的", text: "它用来降低被注入脚本的风险。" }
    ] },
  { lang: "JavaScript", name: "Mixed Content", test: /Mixed Content/, title: "安全页面去加载了不安全的资源",
    meaning: "HTTPS 页面请求了 HTTP 资源，浏览器拦住了。",
    look: "把资源地址改成 https，或改成相对协议的安全地址。",
    points: [
      { term: "HTTPS", text: "加密的页面。" },
      { term: "混合内容", text: "安全页面里再拉明文 HTTP，会被阻止。" }
    ] },
  { lang: "JavaScript", name: "ChunkLoadError", test: /ChunkLoadError|Loading chunk .+ failed/, rank: 2, title: "有一块打包文件没有加载到",
    meaning: "上线后旧页面还在要已经不存在的 chunk，或网络中断。",
    look: "重新刷新页面。若经常出现，检查发布时旧文件是不是被立刻删掉了。",
    points: [
      { term: "代码分割", text: "大项目会拆成多块按需加载。" },
      { term: "文件名带哈希", text: "重新构建后，旧哈希的文件就找不到了。" }
    ] },
  { lang: "JavaScript", name: "Invalid hook call", test: /Invalid hook call/, rank: 2, title: "Hook 的调用不合法",
    meaning: "这是 React 的报错。Hook 被用在了普通函数里，或存在两份 React。",
    look: "只在函数组件或自定义 Hook 顶层调用 Hook。不要放进 if、循环或普通函数。",
    points: [
      { term: "Hook", text: "useState、useEffect 这类函数。" },
      { term: "调用规则", text: "必须在组件渲染的顶层按同样顺序调用。" }
    ] },
  { lang: "JavaScript", name: "Objects are not valid as a React child", test: /Objects are not valid as a React child/, rank: 2, title: "React 不能直接渲染这个对象",
    meaning: "你把普通对象放进了 JSX 子节点。",
    look: "渲染文字、数字或元素。对象要先取出字段，不要整个塞进去。",
    points: [
      { term: "JSX 子节点", text: "可以是文本、元素、数组。普通对象不行。" },
      { term: "先取出字段", text: "要显示名字，就渲染 user.name，不是 user。" }
    ] },
  { lang: "JavaScript", name: "Too many re-renders", test: /Too many re-renders/, rank: 2, title: "渲染次数多到被 React 停下了",
    meaning: "渲染过程中又立刻 setState，造成无限循环。",
    look: "不要在组件函数体里无条件 setState。放到事件或带条件的 effect 里。",
    points: [
      { term: "渲染", text: "函数组件每轮执行一次来算出界面。" },
      { term: "setState", text: "在渲染期间无条件调用，会立刻再渲染，形成循环。" }
    ] },
  { lang: "JavaScript", name: "Minified React error #", test: /Minified React error #/, rank: 2, title: "React 生产版本报了一条压缩过的错误",
    meaning: "生产构建把完整英文换成了编号。",
    look: "打开报错里的 reactjs.org 链接，或在开发模式里看完整信息。",
    points: [
      { term: "生产构建", text: "体积小，错误文本也被缩短了。" },
      { term: "看编号", text: "链接上的错误编号对应一条具体说明。" }
    ] },
  { lang: "JavaScript", name: "Hydration failed", test: /Hydration failed|Text content does not match server-rendered HTML/, rank: 2, title: "服务端和客户端渲染结果不一致",
    meaning: "这是 React 水合失败。两边第一次画出的 HTML 不一样。",
    look: "找只在浏览器才出现的数据，例如日期、随机数、window。让两边第一次输出相同。",
    points: [
      { term: "水合", text: "用客户端 JS 接上服务端已经输出的 HTML。" },
      { term: "必须一致", text: "第一个客户端结果如果和 HTML 不同，水合就会失败。" }
    ] },
  { lang: "JavaScript", name: "Invalid regular expression:", test: /Invalid regular expression:|RegExp: nothing to repeat/, rank: 2, title: "正则表达式不合法",
    meaning: "new RegExp 或字面量的模式有语法错误。",
    look: "看报错里的位置。分组括号和量词要合法。",
    points: [
      { term: "正则字面量", text: "写在两条斜线中间。" },
      { term: "量词", text: "*、+、? 前面必须有能重复的东西。" }
    ] },
  { lang: "JavaScript", name: "URIError", test: /URIError/, title: "URI 编码或解码失败了",
    meaning: "decodeURI 或 decodeURIComponent 遇到了非法的百分号编码。",
    look: "确认字符串真是编码过的。不要对普通文字反复 decode。",
    points: [
      { term: "百分号编码", text: "% 后面应该跟着两位十六进制。" },
      { term: "成对使用", text: "encode 出来的再 decode。不要对任意字符串都 decode。" }
    ] },
  { lang: "JavaScript", name: "QuotaExceededError", test: /QuotaExceededError/, title: "本地存储空间用完了",
    meaning: "localStorage 或类似存储超过了配额。",
    look: "删掉不需要的键，或不要把大文件塞进 localStorage。",
    points: [
      { term: "配额", text: "浏览器给每个站点的本地存储有上限。" },
      { term: "不适合放大数据", text: "它适合小配置，不适合整份数据库。" }
    ] },
  { lang: "JavaScript", name: "SecurityError", test: /SecurityError/, title: "浏览器以安全原因拒绝了操作",
    meaning: "跨源读取、不安全页面使用某些 API，或权限不允许。",
    look: "看完整英文。常见是跨源 frame，或在不安全上下文里调用了敏感 API。",
    points: [
      { term: "安全上下文", text: "有些 API 只在 HTTPS 或 localhost 上可用。" },
      { term: "跨源", text: "一个页面不能随意读取另一个源的内容。" }
    ] },
  { lang: "JavaScript", name: "NotAllowedError", test: /NotAllowedError/, title: "用户或浏览器没有允许这个操作",
    meaning: "自动播放、剪贴板、定位等需要许可的操作被拒绝。",
    look: "放到用户点击之后再调用，并处理用户拒绝的情况。",
    points: [
      { term: "权限", text: "麦克风、定位、剪贴板都可能要用户点头。" },
      { term: "手势", text: "有些 API 必须由点击等用户操作触发。" }
    ] },
  { lang: "JavaScript", name: "AbortError", test: /AbortError/, title: "这次操作被取消了",
    meaning: "请求或动作被 AbortController 或用户取消。",
    look: "如果是你自己取消的，这不一定是故障。需要结果时不要提前 abort。",
    points: [
      { term: "取消", text: "主动停止一个还没完成的异步操作。" },
      { term: "AbortController", text: "用来发出取消信号。" }
    ] },
  { lang: "JavaScript", name: "HierarchyRequestError", test: /HierarchyRequestError/, title: "这个 DOM 节点不能插到这里",
    meaning: "插入节点会形成不允许的结构，例如把节点插进自己的后代。",
    look: "看父节点和被插入的节点是不是同一棵树里的非法关系。",
    points: [
      { term: "DOM 树", text: "节点有父子关系。有的插入会让树变成环。" },
      { term: "先确认父节点", text: "append 之前看清楚要放进谁里面。" }
    ] },
  { lang: "JavaScript", name: "ResizeObserver loop", test: /ResizeObserver loop/, rank: 2, title: "ResizeObserver 的回调里又引起了尺寸变化",
    meaning: "观察尺寸的回调改了布局，导致一轮里反复通知。",
    look: "不要在回调里无休止地改会触发自己的尺寸。把写入留到下一帧再做。",
    points: [
      { term: "ResizeObserver", text: "元素大小变化时通知你。" },
      { term: "避免循环", text: "回调里再改变同一个尺寸，就会连着触发。" }
    ] },
  { lang: "JavaScript", name: "Script error.", test: /Script error\./, rank: 2, title: "跨域脚本只给出了模糊的脚本错误",
    meaning: "错误发生在另一个源的脚本里，浏览器隐藏了细节。",
    look: "把脚本改成可调试的同源地址，或让那个资源带上正确的跨域头再看真错误。",
    points: [
      { term: "跨域脚本", text: "别的域名上的 JS 出错时，页面往往只看到 Script error。" },
      { term: "细节被隐藏", text: "这是浏览器的安全策略，不是说错误本身只有这两个词。" }
    ] },
  { lang: "HTML", name: "Stray start tag", test: /Stray start tag/i, title: "这个开始标签出现的位置不对",
    meaning: "解析器在这个位置不接受这个开始标签。",
    look: "看它前面的标签有没有提前结束，或这个标签是不是放错了父级。",
    points: [
      { term: "开始标签", text: "例如 <div>。它必须出现在允许它的地方。" },
      { term: "看父级", text: "表格、段落、列表里能放什么，是有规定的。" }
    ] },
  { lang: "HTML", name: "End tag had attributes", test: /End tag had attributes/i, title: "结束标签上不能写属性",
    meaning: "属性写到了 </div class> 这种结束标签上。",
    look: "属性只放在开始标签。结束标签只写名字。",
    points: [
      { term: "结束标签", text: "它只负责关上同名的开始标签。" },
      { term: "属性的位置", text: "class、id 都写在开始标签里。" }
    ] },
  { lang: "HTML", name: "End tag for element which is not open", test: /End tag for element which is not open/i, rank: 2, title: "这个结束标签没有对应的开始",
    meaning: "关上的名字，前面并没有打开。",
    look: "核对标签名。删掉多余的结束标签，或补上开始标签。",
    points: [
      { term: "成对", text: "先打开，再关闭。" },
      { term: "名字一致", text: "打开 div 就要关闭 div。" }
    ] },
  { lang: "HTML", name: "A document must contain a title element", test: /A document must contain a title element/i, title: "文档缺少 title",
    meaning: "head 里没有 title。",
    look: "在 head 中加上 title，写上页面标题。",
    points: [
      { term: "title", text: "显示在标签页上的标题。" },
      { term: "放在 head", text: "它不属于 body 里的正文。" }
    ] },
  { lang: "HTML", name: "Element head is missing", test: /Element head is missing|Start tag head seen but/i, title: "文档结构缺了 head 或必需内容",
    meaning: "解析器没有看到完整的 head 结构。",
    look: "按 html、head、body 的基本骨架写。title 放进 head。",
    points: [
      { term: "基本骨架", text: "html 里面通常有 head 和 body。" },
      { term: "head", text: "放标题、编码和样式链接，不放可见正文。" }
    ] },
  { lang: "HTML", name: "Character reference was not terminated", test: /Character reference was not terminated|Named character reference was not terminated/i, title: "字符引用没有正确结束",
    meaning: "& 开头的实体少了分号，或名字不完整。",
    look: "写成 &amp; 这种带分号的形式。不太确定时先把 & 写成 &amp;。",
    points: [
      { term: "字符引用", text: "用 &名字; 表示一个特殊字符。" },
      { term: "分号", text: "HTML 里的实体一般要以分号结束。" }
    ] },
  { lang: "HTML", name: "Saw a form start tag, but there was already an active form", test: /Saw a form start tag, but there was already an active form/i, title: "表单不能再套表单",
    meaning: "一个 form 还没结束，里面又写了 form。",
    look: "把内层表单拆出去。需要分组用 fieldset，不要用嵌套 form。",
    points: [
      { term: "form", text: "一块提交数据的区域。" },
      { term: "不能嵌套", text: "一个表单里面不要再放另一个表单。" }
    ] },
  { lang: "HTML", name: "but an element of the same type was already open", test: /but an element of the same type was already open/i, title: "同一种标签还没关上又开了一个",
    meaning: "例如 a 里面又写了 a。这种嵌套不被允许。",
    look: "先关上内层不该出现的那个，再调整结构。",
    points: [
      { term: "交互元素", text: "链接里再放链接，解析器无法确定点击属于谁。" },
      { term: "先闭合", text: "外层还开着时，不要再开一个不允许嵌套的同名标签。" }
    ] },
  { lang: "HTML", name: "The for attribute of the label element must refer", test: /The for attribute of the label element must refer/i, title: "label 的 for 没有对上控件",
    meaning: "for 里的值应该是某个表单控件的 id，现在对不上。",
    look: "让 for 和控件的 id 完全相同。也可以把控件直接放进 label。",
    points: [
      { term: "label", text: "给输入框一个可点击的说明文字。" },
      { term: "for 和 id", text: "两者要一模一样，控件才会被关联上。" }
    ] },
  { lang: "HTML", name: "An iframe element requires a title", test: /iframe element requires a non-empty|iframe element requires a title|<iframe> missing title/i, title: "iframe 缺少标题",
    meaning: "无障碍要求 iframe 有 title，说明里面是什么。",
    look: "给 iframe 加上 title 属性。",
    points: [
      { term: "iframe", text: "在页面里嵌另一份页面。" },
      { term: "title", text: "给辅助技术读的名字，不要留空。" }
    ] },
  { lang: "HTML", name: "Tag must be paired", test: /Tag must be paired/i, title: "标签没有成对",
    meaning: "htmlhint 发现开始标签或结束标签缺了一边。",
    look: "按提示补上缺失的那一半，并确认名字相同。",
    points: [
      { term: "成对标签", text: "大多数标签要有开始和结束。" },
      { term: "看提示里的名字", text: "它会写出是哪一个标签缺了另一半。" }
    ] },
  { lang: "HTML", name: "Doctype must be declared first", test: /Doctype must be declared first/i, title: "DOCTYPE 必须放在最前面",
    meaning: "htmlhint 要求文件以 doctype 开头。",
    look: "第一行写成 <!DOCTYPE html>。",
    points: [
      { term: "DOCTYPE", text: "声明这是一份现代 HTML 文档。" },
      { term: "只放一次", text: "放在所有标签之前。" }
    ] },
  { lang: "HTML", name: "must be in lowercase", test: /must be in lowercase/i, title: "标签名或属性名要用小写",
    meaning: "htmlhint 发现用了大写标签或属性名。",
    look: "改成小写。HTML 不区分大小写，但团队规范通常要求小写。",
    points: [
      { term: "小写", text: "<div> 而不是 <DIV>。" },
      { term: "属性也一样", text: "class、id 写成小写。" }
    ] },
  { lang: "HTML", name: "attribute value must be closed by double quotes", test: /closed by double quotes|must be closed by double quotes/i, title: "属性值要用双引号包住",
    meaning: "htmlhint 要求属性值使用双引号。",
    look: "写成 name=\"value\"。不要省略引号。",
    points: [
      { term: "属性值", text: "等号右边的内容。" },
      { term: "双引号", text: "用英文双引号，并且要成对。" }
    ] },
  { lang: "HTML", name: "Special characters must be escaped", test: /Special characters must be escaped/i, title: "特殊字符需要转义",
    meaning: "文本里直接写了 < 或 &，可能被当成标签。",
    look: "显示 & 时写成 &amp;，显示 < 时写成 &lt;。",
    points: [
      { term: "文本和标签", text: "浏览器看到 < 会以为标签开始了。" },
      { term: "实体", text: "用实体把这些字符当成普通文字显示。" }
    ] },
  { lang: "HTML", name: "Id must unique", test: /Id must unique/i, title: "id 必须唯一",
    meaning: "检查工具发现同一个 id 出现了多次。",
    look: "每个 id 只留一处。重复的样式钩子改用 class。",
    points: [
      { term: "id", text: "页面里标识唯一元素的名字。" },
      { term: "class", text: "给一组元素用。可以重复。" }
    ] },
  { lang: "HTML", name: "Title tag must", test: /Title tag must/i, title: "页面缺少可用的 title",
    meaning: "htmlhint 没有在 head 里找到有效的 title。",
    look: "在 head 中写上非空的 title。",
    points: [
      { term: "title", text: "标签页标题，也是文档标题。" },
      { term: "不要空着", text: "有标签但里面没字，同样不合格。" }
    ] },
  { lang: "HTML", name: "Img tag must have alt", test: /Img tag must have alt/i, rank: 2, title: "图片缺少 alt",
    meaning: "htmlhint 发现 img 没有替代文字。",
    look: "加上 alt。装饰图可以写空的 alt=\"\"，内容图要写说明。",
    points: [
      { term: "alt", text: "图片不能显示或被读屏时使用的文字。" },
      { term: "不要省略", text: "有 src 还不够，替代文字是另一件事。" }
    ] },
  { lang: "HTML", name: "Attribute is not allowed on element", test: /Attribute is not allowed on element/i, title: "这个属性不能用在这个标签上",
    meaning: "某个属性出现在了不支持它的元素上。",
    look: "看属性和标签的组合。把属性移到正确的标签，或换一个合法属性。",
    points: [
      { term: "属性归属", text: "不是每个属性都能套到每个标签上。" },
      { term: "查这一对", text: "报错会写出属性和元素的名字。" }
    ] },
  { lang: "HTML", name: "Duplicate class attribute", test: /Duplicate (?:of )?attribute name \[ class \]|Duplicate class/i, rank: 2, title: "class 写了多次",
    meaning: "同一个标签上重复写了 class。",
    look: "合并成一个 class，多个类名用空格分开。",
    points: [
      { term: "一个 class 属性", text: "不要写两个 class=。" },
      { term: "空格分隔", text: "class=\"a b\" 表示两个类。" }
    ] },
  { lang: "HTML", name: "Consider adding a lang attribute", test: /Consider adding a lang attribute/i, title: "html 标签缺少语言",
    meaning: "根元素没有 lang，辅助技术难以判断语言。",
    look: "写成 <html lang=\"zh-CN\">。",
    points: [
      { term: "lang", text: "声明这份文档的主要语言。" },
      { term: "写在 html 上", text: "放在根元素，而不是随便一个 div。" }
    ] },
  { lang: "HTML", name: "Bad start tag in", test: /Bad start tag in/i, title: "这个开始标签出现在了错误的父级里",
    meaning: "例如表格或 select 里放了不允许的开始标签。",
    look: "看父标签允许什么孩子。把元素挪到合法位置。",
    points: [
      { term: "父级约束", text: "table、ul、select 都只接受特定子标签。" },
      { term: "不要用 div 硬塞", text: "该用 tr、li、option 的地方不要用别的顶上。" }
    ] },
  { lang: "HTML", name: "Self-closing syntax on a non-void HTML element", test: /Self-closing syntax on a non-void HTML element/i, rank: 2, title: "非空元素不要写成自闭合",
    meaning: "div、span 这类标签被写成了 <div />。",
    look: "改成成对的开始和结束标签。",
    points: [
      { term: "空元素", text: "img、br、input 才没有结束标签。" },
      { term: "普通元素", text: "必须有结束标签，不能只靠斜杠。" }
    ] },
  { lang: "HTML", name: "must not appear as a descendant of the a element", test: /must not appear as a descendant of the a element/i, title: "链接里放了不允许的内容",
    meaning: "a 里面又套了交互元素或另一个链接。",
    look: "把按钮和链接拆开，不要互相嵌套。",
    points: [
      { term: "交互内容", text: "链接、按钮自己就能点击。再套一层会冲突。" },
      { term: "拆结构", text: "需要块级区域时，用 a 包普通元素，不要包另一个 a 或 button。" }
    ] },
  { lang: "HTML", name: "Attribute name must not be empty", test: /Attribute name must not be empty/i, title: "属性名是空的",
    meaning: "出现了没有名字的属性，常见是引号位置错了。",
    look: "检查上一个属性的引号有没有提前结束。",
    points: [
      { term: "属性名", text: "等号左边必须有名字。" },
      { term: "引号", text: "值的引号没关时，后面的字会被拆成奇怪的属性。" }
    ] },
  { lang: "HTML", name: "Misplaced non-space characters inside a table", test: /Misplaced non-space characters inside a table/i, title: "表格结构里混进了文字",
    meaning: "文字直接出现在 table 的结构位置，没有放进单元格。",
    look: "把文字放进 td 或 th。",
    points: [
      { term: "表格里的文字", text: "要放在单元格里，不能直接放在 table 和 tr 之间。" },
      { term: "结构标签", text: "table、tr 负责结构，文字要进单元格。" }
    ] },
  { lang: "HTML", name: "A select element must contain only", test: /select element must contain only|optgroup element/i, title: "select 里放了不允许的标签",
    meaning: "option 或 optgroup 以外的东西进了 select。",
    look: "只把 option 放进去。说明文字放在 label，不要塞进 select。",
    points: [
      { term: "select", text: "下拉框。" },
      { term: "option", text: "每一个可选项。" }
    ] },
  { lang: "HTML", name: "Radio input elements with a name attribute", test: /Radio (?:input|button).+name/i, title: "这组单选框的写法有问题",
    meaning: "同名 radio 的组合不符合校验器的要求。",
    look: "同一组 name 相同。需要默认选中时只让一个带 checked。",
    points: [
      { term: "radio", text: "同一组里只能选一个。" },
      { term: "name", text: "名字相同的才是一组。" }
    ] },
  { lang: "HTML", name: "The empty tag must be self closed", test: /must be self closed|must be self-closed/i, title: "空标签的写法不符合检查规则",
    meaning: "htmlhint 希望 br、img 这类按它的规则闭合。",
    look: "按项目采用的 htmlhint 配置来写。HTML 里这些标签本来就没有结束标签。",
    points: [
      { term: "空标签", text: "没有正文的标签。" },
      { term: "按检查器来", text: "这是检查工具的规则，和浏览器是否能显示不是同一件事。" }
    ] },
  { lang: "CSS", name: "Expected semicolon", test: /(?<!un)Expected\s+semicolon\b/i, rank: 2, title: "这里应该有分号",
    meaning: "一条声明结束时缺了分号。",
    look: "在值的后面补上英文分号，再写下一条。",
    points: [
      { term: "分号", text: "用来隔开同一块里的声明。" },
      { term: "看上一行", text: "报错打在下一行时，分号常常漏在上一行末尾。" }
    ] },
  { lang: "CSS", name: "Expected colon", test: /(?<!un)Expected\s+colon\b/i, rank: 2, title: "属性和值之间应该有冒号",
    meaning: "声明写成了属性后面直接跟值。",
    look: "改成 属性: 值;。",
    points: [
      { term: "冒号", text: "属性名和值的分隔符。" },
      { term: "不是等号", text: "CSS 不用 = 连接属性和值。" }
    ] },
  { lang: "CSS", name: "Unexpected unknown unit", test: /Unexpected unknown unit/i, rank: 2, title: "不认识这个单位",
    meaning: "数字后面的单位不是 CSS 里的单位，或多半拼错了。",
    look: "长度用 px、em、rem、%。时间用 s 或 ms。",
    points: [
      { term: "单位", text: "告诉浏览器这个数字是长度、时间还是角度。" },
      { term: "拼写", text: "px 不是 pix。ms 才是毫秒。" }
    ] },
  { lang: "CSS", name: "Unexpected invalid hex color", test: /Unexpected invalid hex color/i, rank: 2, title: "这个十六进制颜色不合法",
    meaning: "井号后面的位数或字符不对。",
    look: "写成 #rgb、#rrggbb 或 #rrggbbaa。字符只能是 0-9 和 a-f。",
    points: [
      { term: "十六进制颜色", text: "用十六进制表示红绿蓝。" },
      { term: "位数", text: "3、4、6、8 位是合法长度。5 位这样的长度不行。" }
    ] },
  { lang: "CSS", name: "Unexpected unknown at-rule", test: /Unexpected unknown at-rule/i, rank: 2, title: "不认识这个 @ 规则",
    meaning: "@ 后面的名字不是标准规则，或拼错了。",
    look: "核对是 @media、@keyframes、@import 中的哪一个。",
    points: [
      { term: "at 规则", text: "以 @ 开头，用来写媒体查询、动画、引入文件。" },
      { term: "拼写", text: "@media 不要写成 @medai。" }
    ] },
  { lang: "CSS", name: "Unexpected unknown pseudo-class", test: /Unexpected unknown pseudo-class/i, rank: 2, title: "不认识这个伪类",
    meaning: "冒号后面的伪类名拼错了，或不是标准伪类。",
    look: "常见的是 :hover、:focus、:nth-child()。对照拼写。",
    points: [
      { term: "伪类", text: "按状态选中元素，例如鼠标悬停。" },
      { term: "一个冒号", text: "伪类通常是一个冒号。伪元素是两个。" }
    ] },
  { lang: "CSS", name: "Unexpected unknown pseudo-element", test: /Unexpected unknown pseudo-element/i, rank: 2, title: "不认识这个伪元素",
    meaning: ":: 后面的名字不对。",
    look: "常用 ::before、::after、::placeholder。",
    points: [
      { term: "伪元素", text: "选中元素的某个部分，或生成一个虚拟子内容。" },
      { term: "两个冒号", text: "伪元素写作两个冒号。" }
    ] },
  { lang: "CSS", name: "Unexpected empty block", test: /Unexpected empty block/i, rank: 2, title: "这个规则块是空的",
    meaning: "选择器有了，大括号里没有任何声明。",
    look: "补上声明，或删掉这个空块。",
    points: [
      { term: "规则块", text: "选择器加上大括号。" },
      { term: "空的不会生效", text: "里面没有属性，就不会改变页面。" }
    ] },
  { lang: "CSS", name: "Unclosed comment", test: /Unclosed comment/i, title: "注释没有结束",
    meaning: "/* 开了头，没有 */。",
    look: "在注释末尾补上 */。不要用 HTML 的 <!-- 来关 CSS 注释。",
    points: [
      { term: "CSS 注释", text: "只认 /* */。" },
      { term: "会吞掉后面", text: "没关上时，后面的样式都会被当成注释。" }
    ] },
  { lang: "CSS", name: "@import must precede", test: /@import must precede|@import rules must precede/i, title: "@import 必须写在最前面",
    meaning: "在普通规则之后又写了 @import。",
    look: "把所有 @import 挪到样式表开头，charset 之后、其他规则之前。",
    points: [
      { term: "@import", text: "把另一份样式表引进来。" },
      { term: "顺序", text: "它不能出现在普通选择器规则后面。" }
    ] },
  { lang: "CSS", name: "@charset must", test: /@charset must/i, title: "@charset 的位置不对",
    meaning: "@charset 如果要写，必须在文件最开始。",
    look: "要么删掉它，要么把它放到第一行，并且整份文件编码一致。",
    points: [
      { term: "@charset", text: "声明样式表使用的编码。" },
      { term: "只能在最前", text: "前面不能有选择器或其他规则。" }
    ] },
  { lang: "CSS", name: "Expected keyframe name", test: /(?<!un)Expected keyframe name/i, title: "关键帧动画缺少名字",
    meaning: "@keyframes 后面没有合法名字。",
    look: "写成 @keyframes 名字 { ... }。名字不要用引号乱包，除非你确定语法允许。",
    points: [
      { term: "@keyframes", text: "定义动画的每一段状态。" },
      { term: "名字", text: "animation-name 要用同一个名字才能对上。" }
    ] },
  { lang: "CSS", name: "Expected a trailing semicolon", test: /Expected a trailing semicolon/i, rank: 2, title: "声明块里少了结尾分号",
    meaning: "检查工具要求每条声明以分号结束。",
    look: "给最后一条也加上分号。这样下一次加人时不容易粘在一起。",
    points: [
      { term: "结尾分号", text: "最后一条在浏览器里有时可以省略，检查工具仍可能要求写上。" },
      { term: "这是检查规则", text: "浏览器不一定因此拒绝整份 CSS，但你的检查会失败。" }
    ] },
  { lang: "CSS", name: "Unexpected extra semicolon", test: /Unexpected extra semicolon/i, rank: 2, title: "多写了分号",
    meaning: "出现了空的声明，例如两个分号挨着。",
    look: "删掉多余的分号，留下属性、冒号、值、一个分号。",
    points: [
      { term: "空声明", text: "只有分号、没有属性，是多余的。" },
      { term: "留一个", text: "每条声明一个分号就够。" }
    ] },
  { lang: "CSS", name: "Unexpected missing generic font family", test: /Unexpected missing generic font family/i, title: "字体列表缺少通用字体族",
    meaning: "font-family 只写了具体字体，没有 sans-serif 这种兜底。",
    look: "在最后加上 serif、sans-serif 或 monospace。",
    points: [
      { term: "font-family", text: "按顺序使用字体，前面没有就用后面的。" },
      { term: "通用族", text: "具体字体在别人电脑上可能没有，通用族保证还有得用。" }
    ] },
  { lang: "CSS", name: "Unexpected !important", test: /Unexpected !important/i, title: "这里使用了 !important",
    meaning: "检查工具不允许这条声明用 !important。",
    look: "提高选择器的具体程度来覆盖样式，而不是靠 !important。确实要保留时再调整检查配置。",
    points: [
      { term: "!important", text: "把这条声明的优先级抬到很高。" },
      { term: "难维护", text: "到处使用后，后来的样式很难再覆盖。" }
    ] },
  { lang: "CSS", name: "Unexpected unknown custom property", test: /Unexpected unknown (?:custom property|variable)/i, rank: 2, title: "这个自定义属性没有定义",
    meaning: "var() 用了一个没写过的 -- 变量，而且没有兜底。",
    look: "在合适的选择器里定义那个 -- 变量，或给 var() 第二个兜底值。",
    points: [
      { term: "自定义属性", text: "以 -- 开头的变量。" },
      { term: "var", text: "var(--颜色, 兜底) 在变量不存在时用兜底。" }
    ] },
  { lang: "CSS", name: "Expected closing parenthesis", test: /(?<!un)Expected closing parenthesis/i, rank: 2, title: "少了右括号",
    meaning: "函数或 calc 的括号没有关。",
    look: "从左括号数到右括号。calc、rgb、var 都要关上。",
    points: [
      { term: "CSS 函数", text: "rgb()、calc()、var() 都是函数写法。" },
      { term: "括号成对", text: "每一个 ( 都要有 )。" }
    ] },
  { lang: "CSS", name: "Expected dimension", test: /(?<!un)Expected dimension/i, title: "这里应该是带单位的尺寸",
    meaning: "这个位置需要长度，你给了不带单位的数字或别的类型。",
    look: "除了 0，长度一般要带 px、em、rem 或 %。",
    points: [
      { term: "尺寸", text: "宽度、距离都要说明单位。" },
      { term: "0 可以例外", text: "0 写不写单位通常都可以，其他数字不行。" }
    ] },
  { lang: "CSS", name: "Invalid keyframe selector", test: /Invalid keyframe selector/i, title: "关键帧选择器不合法",
    meaning: "@keyframes 里出现了无法识别的选择器。",
    look: "写成 0%、50%、100%，或 from 和 to。",
    points: [
      { term: "关键帧选择器", text: "表示动画进行到哪一截。" },
      { term: "百分比", text: "必须落在 0% 到 100%。" }
    ] },
  { lang: "CSS", name: "Unexpected duplicate property", test: /Unexpected duplicate (?:property|selector|font-family)/i, rank: 2, title: "同一个属性写了两次",
    meaning: "同一块里重复写了属性、选择器或字体族。",
    look: "留下要生效的那一条，删掉重复的。",
    points: [
      { term: "后面的覆盖前面的", text: "同一块里后写的同名属性会盖住前面的。" },
      { term: "留一条", text: "重复通常是编辑时留下的。" }
    ] },
  { lang: "CSS", name: "Expected modern color-function notation", test: /Expected modern color-function notation/i, title: "颜色函数被要求写成新语法",
    meaning: "检查工具希望 rgb 使用新的写法。",
    look: "这是风格规则。可以改成空格分隔的现代写法，或调整检查配置。",
    points: [
      { term: "颜色函数", text: "rgb、hsl 都有新旧写法。" },
      { term: "不一定是浏览器错误", text: "旧写法很多浏览器仍能认识。这是检查工具在要求新写法。" }
    ] },
  { lang: "CSS", name: "no-descending-specificity", test: /no-descending-specificity|Expected selector of higher specificity/i, title: "选择器优先级写反了",
    meaning: "后面出现了比前面更不具体的选择器，检查工具认为覆盖关系容易看错。",
    look: "调整源码顺序，或让选择器的具体程度和出现顺序一致。",
    points: [
      { term: "优先级", text: "选择器越具体，越能盖住不具体的。" },
      { term: "顺序", text: "同样具体时，后写的赢。这个规则是在帮你避免看走眼。" }
    ] },
  { lang: "CSS", name: "Unexpected unit in zero", test: /Unexpected unit|unit for zero length|Length is zero/i, title: "0 后面被要求不要带单位",
    meaning: "检查工具认为 0px 应写成 0。",
    look: "这只影响写法。把 0px、0em 改成 0 即可通过这条规则。",
    points: [
      { term: "零", text: "长度为零时，单位并不改变结果。" },
      { term: "检查规则", text: "浏览器认 0px。这是项目检查在要求简写。" }
    ] },
  { lang: "CSS", name: "Expected whitespace", test: /(?<!un)Expected\s+whitespace|(?<!un)Expected single space/i, rank: 2, title: "这里缺了检查工具要求的空白",
    meaning: "冒号、逗号或括号旁的空格不符合项目规则。",
    look: "按提示补上空格或删掉空格。这通常不是浏览器无法解析。",
    points: [
      { term: "空白", text: "多数情况下不改变含义，但检查工具会统一格式。" },
      { term: "看预期", text: "它会说期望有空白还是不该有空白。" }
    ] },
  { lang: "CSS", name: "Unexpected whitespace", test: /Unexpected whitespace/i, rank: 2, title: "这里多了检查工具不允许的空白",
    meaning: "空格出现在了规则禁止的位置。",
    look: "按提示删掉。如果整份文件因此都报，先看是不是格式规则太严。",
    points: [
      { term: "格式", text: "空格多一点，浏览器常常仍能读。" },
      { term: "检查失败", text: "CI 或编辑器仍会把它当成问题。" }
    ] },
  { lang: "CSS", name: "Unknown animation name", test: /Unknown animation name/i, title: "动画名字没有对应的关键帧",
    meaning: "animation 用了一个没有 @keyframes 的名字。",
    look: "让 animation-name 和 @keyframes 的名字一致。",
    points: [
      { term: "animation", text: "把关键帧按时间播出来。" },
      { term: "名字要对上", text: "差一个字母就找不到那段动画。" }
    ] },
  { lang: "CSS", name: "Expected cell token", test: /Expected cell token/i, title: "网格区域有一格写得不对",
    meaning: "grid-template-areas 里某一行的格子无法识别，或行与行对不齐。",
    look: "让每一行的名字数量相同。空位用句点表示。",
    points: [
      { term: "网格区域", text: "用名字摆出格子的形状。" },
      { term: "矩形", text: "每一行要一样长，同一个名字要连成矩形。" }
    ] },
  { lang: "CSS", name: "operands could not be parsed", test: /operands could not be parsed/i, title: "calc 里的运算没有解析成功",
    meaning: "calc 的加减号和数字粘在一起，或括号里的式子不完整。",
    look: "加减号两边留出空格，例如 calc(100% - 20px)。",
    points: [
      { term: "calc", text: "在 CSS 里做计算。" },
      { term: "减号和负号", text: "没有空格时，减号可能被当成负号的一部分。" }
    ] },
  { lang: "C/C++", name: "expected ';' before", test: /expected ';' before/, rank: 2, title: "这里少了分号",
    meaning: "编译器在这个位置还等着一个分号。",
    look: "先看这一行，再看上一行末尾。漏掉的分号经常在上一句。",
    points: [
      { term: "分号", text: "C 和 C++ 的语句通常用分号结束。" },
      { term: "看上一行", text: "标出的位置常常是发现错误的地方，不是漏写的那一格。" }
    ] },
  { lang: "C/C++", name: "expected expression", test: /expected expression/, rank: 2, title: "这里应该是一个表达式",
    meaning: "这个位置需要一个能算出值的式子，现在的符号对不上。",
    look: "看是不是多了分号、少了操作数，或把声明写进了表达式里。",
    points: [
      { term: "表达式", text: "能算出一个值的那一截，例如 a + 1。" },
      { term: "不要空着", text: "运算符两边、括号里面，都要有完整的内容。" }
    ] },
  { lang: "C/C++", name: "expected '}' at end of input", test: /expected '\}' at end of input/, rank: 2, title: "文件结束了，大括号还没配平",
    meaning: "读到文件末尾，还有 { 没有关上。",
    look: "从最后一块往上数大括号。函数、结构体、if 都要有 }。",
    points: [
      { term: "大括号", text: "每一个 { 都要有 }。" },
      { term: "文件末尾", text: "错误打在最后，缺口常常在更前面。" }
    ] },
  { lang: "C/C++", name: "expected declaration or statement at end of input", test: /expected declaration or statement at end of input/, rank: 2, title: "文件结束时语句还不完整",
    meaning: "编译器还在等一条声明或语句，文件却结束了。",
    look: "检查最后几个函数的大括号和分号有没有写完。",
    points: [
      { term: "声明或语句", text: "文件里剩下的位置，应该是完整的声明或语句。" },
      { term: "先配平括号", text: "少一个 } 时，后面整段都会被看成还在里面。" }
    ] },
  { lang: "C/C++", name: "implicit declaration of function", test: /implicit declaration of function/, title: "函数在使用前没有声明",
    meaning: "编译器第一次见到这个函数名，没有看到它的声明或头文件。",
    look: "在调用前写出函数原型，或包含正确的头文件。C++ 里这通常直接是错误。",
    points: [
      { term: "函数原型", text: "告诉编译器函数的名字、参数和返回值。" },
      { term: "头文件", text: "printf 需要 stdio.h，malloc 需要 stdlib.h。没包含就会像没声明。" }
    ] },
  { lang: "C/C++", name: "conflicting types for", test: /conflicting types for/, title: "这个函数的类型前后不一致",
    meaning: "同一函数有两份声明或定义，返回值或参数对不上。",
    look: "把原型和定义放在一起对。参数个数、类型、返回值都要相同。",
    points: [
      { term: "原型和定义", text: "前面的声明和后面的函数体必须是同一个签名。" },
      { term: "顺序", text: "先写对声明，再写定义。后写的声明不能改口。" }
    ] },
  { lang: "C/C++", name: "unknown type name", test: /unknown type name/, title: "不认识这个类型名",
    meaning: "编译器没见过这个类型。可能是没包含头文件，或名字拼错。",
    look: "核对类型拼写。自定义类型要在使用前定义，或包含它的头文件。",
    points: [
      { term: "类型名", text: "int、结构体名、typedef 名，都要事先存在。" },
      { term: "先定义再使用", text: "结构体写在使用它的代码后面，又没有提前声明，这里就不认识。" }
    ] },
  { lang: "C/C++", name: "storage size of 'x' isn't known", test: /storage size of '.+' isn't known/, title: "这个类型的大小还不知道",
    meaning: "你在创建变量或数组，但类型还不完整，编译器算不出要留多少空间。",
    look: "包含完整定义。只有前向声明、还没写字段的结构体不能直接拿来建变量。",
    points: [
      { term: "完整类型", text: "要知道它占多少字节，才能开辟变量。" },
      { term: "前向声明不够", text: "只写 struct Foo; 还没有字段时，不能写 struct Foo a;。" }
    ] },
  { lang: "C/C++", name: "request for member 'a' in something not a structure or union", test: /request for member '.+' in something not a structure or union/, title: "在不是结构体的东西上取了成员",
    meaning: "点号左边不是结构体或联合体，不能写 a.b。",
    look: "看左边的类型。指针要用 ->。普通整数不能点出成员。",
    points: [
      { term: "成员", text: "结构体里面的字段，用点号或箭头取出。" },
      { term: "点和箭头", text: "对象用 . ，指针用 -> 。用反了就会报类型不对。" }
    ] },
  { lang: "C/C++", name: "base operand of '->' has non-pointer type", test: /base operand of '->' has non-pointer type/, title: "箭头用在了不是指针的对象上",
    meaning: "-> 的左边必须是指向结构体的指针。你给的是对象本身。",
    look: "对象用点号。只有指针才用箭头。",
    points: [
      { term: "->", text: "先解引用，再取成员。左边要是指针。" },
      { term: ".", text: "对象、引用直接取成员时用点号。" }
    ] },
  { lang: "C/C++", name: "invalid type argument of unary '*'", test: /invalid type argument of unary '\*'/, title: "星号不能用在这个类型上",
    meaning: "解引用 *p 时，p 不是指针。",
    look: "看这个变量是不是真的声明成了指针。整数不能解引用。",
    points: [
      { term: "解引用", text: "*p 表示取出指针指向的内容。" },
      { term: "指针才有内容可取", text: "普通 int 里面不是地址，不能加星号。" }
    ] },
  { lang: "C/C++", name: "called object 'f' is not a function or function pointer", test: /called object '.+' is not a function or function pointer/, title: "这个东西不能当函数调用",
    meaning: "你加了括号去调用它，但它不是函数，也不是函数指针。",
    look: "看括号左边的类型。不要对普通变量、数组名用错的方式加括号。",
    points: [
      { term: "调用", text: "函数名或函数指针后面才能加括号。" },
      { term: "函数指针", text: "指向函数的指针要先指向真正的函数，再调用。" }
    ] },
  { lang: "C/C++", name: "format '%d' expects argument of type", test: /format '.+' expects argument of type/, title: "printf 的格式和参数类型不一致",
    meaning: "格式串里的 %d、%s 等，和后面实际传入的参数类型对不上。",
    look: "按格式符改参数，或按参数改格式符。%d 对 int，%s 对字符串，%f 对 double。",
    points: [
      { term: "格式符", text: "它规定下一个参数必须是哪种类型。" },
      { term: "个数和类型都要合", text: "少传、多传、类型错，都会在这里被指出。" }
    ] },
  { lang: "C/C++", name: "too many arguments for format", test: /too many arguments for format/, rank: 2, title: "printf 的参数比格式符多",
    meaning: "格式串里的占位符个数，少于后面给出的参数。",
    look: "数一数 % 开头的占位符，让参数个数和它一致。",
    points: [
      { term: "格式串", text: "里面每一个占位符消费一个参数。" },
      { term: "不要多传", text: "多出来的参数没有位置可放，编译器会警告或报错。" }
    ] },
  { lang: "C/C++", name: "may be used uninitialized in this function", test: /may be used uninitialized in this function/, title: "这个变量可能还没有赋值就被使用了",
    meaning: "有的路径上还没写过这个局部变量，就读了它。",
    look: "在所有会用到它的路径之前先赋值。不要读一个刚声明、还没写的局部变量。",
    points: [
      { term: "未初始化", text: "局部变量不会自动变成 0。没写过就读，里面是不确定的值。" },
      { term: "每条路径", text: "if 的两边都要看。只要有一条路没赋值又去读，就会这样说。" }
    ] },
  { lang: "C/C++", name: "function returns address of local variable", test: /function returns address of local variable/, title: "返回了局部变量的地址",
    meaning: "函数结束后，局部变量就没了。把它们的地址交出去，调用方拿到的是失效地址。",
    look: "返回值本身，或返回一块你用 malloc 得到、由调用方负责释放的内存。不要 return &局部变量。",
    points: [
      { term: "局部变量", text: "活在这次函数调用里。函数 return 后就不能再碰。" },
      { term: "地址会失效", text: "指针还在，它指过的那块栈内存已经不再属于你。" }
    ] },
  { lang: "C/C++", name: "ISO C++ forbids converting a string constant to 'char*'", test: /ISO C\+\+ forbids converting a string constant to 'char\*'/, title: "字符串字面量不能赋给 char*",
    meaning: "\"abc\" 的类型是 const char[]。普通 char* 表示可以修改，C++ 不允许这种转换。",
    look: "左边改成 const char*。如果真的要一块可改的字符数组，就复制一份，不要直接改字面量。",
    points: [
      { term: "字符串字面量", text: "写在源码里的 \"abc\"，内容不能改。" },
      { term: "const char*", text: "只读的字符指针，用来指向这种字面量。" }
    ] },
  { lang: "C/C++", name: "cannot bind non-const lvalue reference", test: /cannot bind non-const lvalue reference/, title: "非常量引用绑不上这个值",
    meaning: "函数要的是可修改的引用，你传了临时值或常量。",
    look: "传一个真正的变量，或把参数改成 const 引用。临时结果不能绑到非 const 引用上。",
    points: [
      { term: "引用", text: "给已有对象起的另一个名字。非 const 引用要求对方允许修改。" },
      { term: "临时值", text: "表达式当场算出的结果没有稳定的变量名，不能拿去长期修改。" }
    ] },
  { lang: "C/C++", name: "use of deleted function", test: /use of deleted function/, title: "调用了已被删除的函数",
    meaning: "这个函数被标成 = delete，不能再调用。",
    look: "换一个可用的构造或函数。复制被删除时，不要按值拷贝那个对象。",
    points: [
      { term: "= delete", text: "明确禁止使用这份函数。" },
      { term: "常见于拷贝", text: "有的类型禁止复制。按值传递或 return 时就会撞上。" }
    ] },
  { lang: "C/C++", name: "is private within this context", test: /is private within this context/, title: "这里访问不了 private 成员",
    meaning: "这个字段或函数是私有的，当前代码不在它允许的范围内。",
    look: "通过类提供的公开函数去用，或把这段代码写成类的成员、友元。不要从类外面直接碰 private。",
    points: [
      { term: "private", text: "只有类自己的成员和友元能用。" },
      { term: "公开接口", text: "外部需要的能力，应该走 public 函数，而不是直接拿私有字段。" }
    ] },
  { lang: "C/C++", name: "call of overloaded 'f' is ambiguous", test: /call of overloaded '.+' is ambiguous/, rank: 2, title: "这个重载调用有两种以上解释",
    meaning: "同名函数有多份，这次参数让编译器无法选定唯一的一份。",
    look: "把参数收成某一种明确的类型，或改调用，让只有一个重载说得通。",
    points: [
      { term: "重载", text: "同名函数靠参数类型区分。" },
      { term: "不要让编译器猜", text: "两种都成立时，它会拒绝，而不是随便选一个。" }
    ] },
  { lang: "C/C++", name: "cannot declare variable 'x' to be of abstract type", test: /cannot declare variable '.+' to be of abstract type/, title: "不能创建抽象类的变量",
    meaning: "这个类还有纯虚函数，不能直接变成对象。",
    look: "创建它的具体子类。抽象类只能当指针或引用所指向的类型。",
    points: [
      { term: "抽象类", text: "有纯虚函数的类，自己不完整。" },
      { term: "具体子类", text: "把纯虚函数都实现了，才能创建对象。" }
    ] },
  { lang: "C/C++", name: "undefined reference to `vtable for", test: /undefined reference to `vtable for/, rank: 2, title: "链接时找不到这张虚函数表",
    meaning: "有虚函数的类，链接器没找到它的虚表。常见是纯虚函数没有实现，或对应的源文件没参加链接。",
    look: "把声明了的虚函数都写出函数体。确认那个 .cpp 被一起编译、一起链接。",
    points: [
      { term: "虚表", text: "C++ 用来找到虚函数实际版本的一张表。" },
      { term: "要有一份实现", text: "第一个非纯虚函数的实现文件，通常会带上这张表。" }
    ] },
  { lang: "C/C++", name: "pure virtual method called", test: /pure virtual method called/, title: "调用了纯虚函数",
    meaning: "对象还没构造完，或已经析构，却走到了纯虚函数。",
    look: "不要在构造函数和析构函数里调用还没实现的虚函数。",
    points: [
      { term: "纯虚函数", text: "只有声明、没有函数体，留给子类实现。" },
      { term: "构造期间", text: "构造父类时，子类部分还不存在，虚调用不会进子类。" }
    ] },
  { lang: "C/C++", name: "static assertion failed", test: /static assertion failed/, title: "静态断言没有通过",
    meaning: "static_assert 里的条件在编译时就是假的。",
    look: "看断言后面的说明文字。它在检查类型、大小或编译期条件。",
    points: [
      { term: "static_assert", text: "编译时就判断的断言。失败了程序编不出来。" },
      { term: "条件是假的", text: "不是运行到那一行才发现，而是类型或常量不满足要求。" }
    ] },
  { lang: "C/C++", name: "fatal error: stdio.h: No such file or directory", test: /fatal error: .+No such file or directory|'.+' file not found/, title: "找不到要包含的头文件",
    meaning: "include 写的文件，编译器在搜索路径里没有找到。",
    look: "核对文件名和尖括号、引号。自己的头文件通常用引号，并确认它在源码目录或 -I 指定的目录里。",
    points: [
      { term: "include", text: "把另一个文件的内容在编译时嵌进来。" },
      { term: "搜索路径", text: "尖括号多半找系统目录，引号会先找当前目录。" }
    ] },
  { lang: "C/C++", name: "#endif without #if", test: /#endif without #if/, title: "endif 没有对应的 if",
    meaning: "预处理指令 #endif 多了，或前面的 #if / #ifdef 没写。",
    look: "从这一行往上找 #if、#ifdef、#ifndef。每一个 endif 都要有开头。",
    points: [
      { term: "条件编译", text: "用预处理指令决定哪一段代码参加编译。" },
      { term: "成对", text: "#if 和 #endif 要成对，可以嵌套，但不能多关。" }
    ] },
  { lang: "C/C++", name: "unterminated #ifndef", test: /unterminated #ifndef|unterminated conditional directive/, title: "条件编译没有用 endif 结束",
    meaning: "#ifndef 或 #if 开了头，文件结束前没有 #endif。",
    look: "在对应的头文件或这段代码末尾补上 #endif。",
    points: [
      { term: "头文件保护", text: "常用 #ifndef、#define、#endif 防止同一个头文件被包含两次。" },
      { term: "必须关上", text: "开了条件编译，就要在后面关上。" }
    ] },
  { lang: "C/C++", name: "invalid preprocessing directive", test: /invalid preprocessing directive/, title: "这条预处理指令写错了",
    meaning: "# 后面不是合法的预处理命令，或多写了符号。",
    look: "核对是 include、define、if、ifdef、ifndef、endif 中的哪一个。# 通常要放在行首。",
    points: [
      { term: "预处理", text: "正式编译前先处理以 # 开头的行。" },
      { term: "拼写", text: "#inlcude 这样的拼写不会被当成 include。" }
    ] },
  { lang: "C/C++", name: "#include expects \"FILENAME\" or <FILENAME>", test: /#include expects "FILENAME" or <FILENAME>/, title: "include 后面的文件名写法不对",
    meaning: "#include 后面必须是引号或尖括号包住的文件名。",
    look: "写成 #include <stdio.h> 或 #include \"mine.h\"。不要漏掉括号或引号。",
    points: [
      { term: "两种写法", text: "尖括号和引号代表不同的查找方式。" },
      { term: "文件名要包住", text: "裸写一个单词，预处理不接受。" }
    ] },
  { lang: "C/C++", name: "missing ';' before", test: /missing ';' before/, rank: 2, title: "这里少了分号",
    meaning: "编译器在继续读下去之前，发现上一段少了分号。",
    look: "看它指出的符号前面那一句。把分号补在该结束的地方。",
    points: [
      { term: "MSVC 和 GCC 说法不同", text: "有的编译器说 missing ';' before，有的说 expected ';'。意思都是少分号。" },
      { term: "看它点名的符号", text: "before 后面的符号，是它往下读到、发现不对的地方。" }
    ] },
  { lang: "C/C++", name: "unresolved external symbol", test: /unresolved external symbol/, title: "链接时找不到这个外部符号",
    meaning: "有声明，但链接器没有找到函数或变量的实现。Visual C++ 常用这句话。",
    look: "确认实现所在的源文件参加了生成。库函数还要确认连上了对应的库。",
    points: [
      { term: "外部符号", text: "别的目标文件或库里应该提供的函数、变量。" },
      { term: "LNK2019", text: "这是链接错误，不是某一行语法还没过。" }
    ] },
  { lang: "C/C++", name: "fatal error LNK1120", test: /fatal error LNK1120/, title: "因为有未解析的符号，链接失败了",
    meaning: "前面已经有找不到的外部符号，所以最后无法生成程序。",
    look: "先看上面的 unresolved external。这条只是总结。",
    points: [
      { term: "链接的最后一笔", text: "它告诉你有几个符号没找到。" },
      { term: "先修上面的", text: "把缺的实现或库补上，这一句会一起消失。" }
    ] },
  { lang: "C/C++", name: "cannot open file 'a.exe' for writing", test: /cannot open file '.+' for writing|LNK1104/, title: "生成的程序文件正在被占用，写不进去",
    meaning: "链接器要写出 exe，但这个文件正被运行或被别的程序锁住。",
    look: "先关掉正在运行的那个程序，再重新生成。",
    points: [
      { term: "文件被占用", text: "程序还开着时，不能覆盖它自己的 exe。" },
      { term: "先停再编", text: "停掉进程，或换一个输出名字。" }
    ] },
  { lang: "C/C++", name: "'else' without a previous 'if'", test: /'else' without a previous 'if'/, title: "else 没有配对的 if",
    meaning: "else 出现时，前面没有一个能配上的 if。",
    look: "看 else 上面是不是 if。多写的大括号可能把 if 提前结束了。",
    points: [
      { term: "else", text: "必须紧跟在 if 那一支后面。" },
      { term: "大括号范围", text: "if 的 } 写早了，else 就会落在外面。" }
    ] },
  { lang: "C/C++", name: "break statement not within loop or switch", test: /break statement not within loop or switch/, title: "break 不在循环或 switch 里",
    meaning: "break 写在了它能离开的结构外面。",
    look: "把它移进 for、while 或 switch。单独放在函数里是不合法的。",
    points: [
      { term: "break", text: "用来离开循环或 switch。" },
      { term: "必须有目标", text: "外面没有这些结构，就没有可离开的地方。" }
    ] },
  { lang: "C/C++", name: "continue statement not within a loop", test: /continue statement not within a loop/, title: "continue 不在循环里",
    meaning: "continue 只能用在 for 或 while 里面。",
    look: "移进循环，或删掉它。",
    points: [
      { term: "continue", text: "跳过本轮剩余部分，进入下一轮。" },
      { term: "switch 不算", text: "continue 不是用来跳过 case 的。" }
    ] },
  { lang: "C/C++", name: "case label not within a switch", test: /case label not within a switch/, title: "case 没有写在 switch 里",
    meaning: "case 或 default 出现在 switch 外面。",
    look: "把 case 放进 switch 的大括号。确认 switch 的括号没有提前结束。",
    points: [
      { term: "case", text: "只能作为 switch 里的分支标签。" },
      { term: "括号", text: "switch 的 } 写早了，后面的 case 就会露在外面。" }
    ] },
  { lang: "C/C++", name: "duplicate case value", test: /duplicate case value/, title: "switch 里这个 case 值重复了",
    meaning: "同一个 switch 中，同一个常量出现了两次。",
    look: "删掉重复的 case，或改成不同的常量。",
    points: [
      { term: "一个值一支", text: "同一个常量不能有两个 case。" },
      { term: "必须是常量", text: "case 后面要是编译时就能确定的值。" }
    ] },
  { lang: "C/C++", name: "'return' with a value, in function returning void", test: /'return' with a value, in function returning void/, title: "void 函数却返回了值",
    meaning: "函数声明成没有返回值，return 后面却写了表达式。",
    look: "删掉 return 后面的值，或把函数返回类型改成那个值的类型。",
    points: [
      { term: "void", text: "表示不交回数据。" },
      { term: "return;", text: "只结束函数时，不要在后面再写一个值。" }
    ] },
  { lang: "C/C++", name: "'return' with no value, in function returning non-void", test: /'return' with no value, in function returning non-void/, title: "该返回值的函数用了空 return",
    meaning: "函数承诺要返回数据，这条 return 后面什么都没有。",
    look: "写成 return 一个值。每条结束路径都要交回正确类型。",
    points: [
      { term: "非 void", text: "调用方等着一个结果。" },
      { term: "不要写空 return", text: "return; 只适用于 void 函数。" }
    ] },
  { lang: "C/C++", name: "empty character constant", test: /empty character constant/, title: "字符常量是空的",
    meaning: "写了 ''，里面没有字符。",
    look: "放进一个字符，例如 'a'。空的文本要用空字符串 \"\"，那是另一个类型。",
    points: [
      { term: "字符常量", text: "单引号里通常正好一个字符。" },
      { term: "空字符串另说", text: "\"\" 才表示长度为 0 的字符串。" }
    ] },
  { lang: "C/C++", name: "unknown escape sequence", test: /unknown escape sequence/, title: "不认识这个转义",
    meaning: "反斜杠后面的字符不是合法转义。",
    look: "常用的是 \\n、\\t、\\\\、\\\"。路径里的一个反斜杠要写成两个。",
    points: [
      { term: "转义", text: "反斜杠表示后面的字符有特殊含义。" },
      { term: "写反斜杠本身", text: "要写出一个 \\ 字符，源码里要写 \\\\。" }
    ] },
  { lang: "C/C++", name: "multi-character character constant", test: /multi-character character constant/, title: "单引号里放了多个字符",
    meaning: "写成了 'ab' 这种多个字符的字符常量。它不是字符串。",
    look: "多个字符用双引号，写成 \"ab\"。单引号只放一个字符。",
    points: [
      { term: "单引号", text: "给 char 用。" },
      { term: "双引号", text: "给字符串用。" }
    ] },
  { lang: "C/C++", name: "array subscript is not an integer", test: /array subscript is not an integer/, title: "数组下标不是整数",
    meaning: "a[i] 里的 i 是小数、指针或其他不能当位置的类型。",
    look: "下标改成整数。不要用 float 或另一个数组去当下标。",
    points: [
      { term: "下标", text: "位置从 0 开始，必须是整数。" },
      { term: "指针不是下标", text: "指针可以和整数相加，但不能直接写进 []，除非它本来就是合适的整数类型。" }
    ] },
  { lang: "C/C++", name: "invalid operands to binary", test: /invalid operands to binary/, title: "这个运算符两边的类型不能一起运算",
    meaning: "加、减、比较或其他二元运算，两边的类型配不上。",
    look: "看运算符两边的类型。指针和指针不能相加，字符串不能直接用 == 比内容。",
    points: [
      { term: "二元运算", text: "运算符左右各有一个操作数。" },
      { term: "先统一类型", text: "需要的话先转换，或换一种能用于这两种类型的写法。" }
    ] },
  { lang: "C/C++", name: "comparison between pointer and integer", test: /comparison between pointer and integer/, title: "指针和整数被放在一起比较了",
    meaning: "if (p == 0) 以外，把指针和一个普通整数比，类型并不匹配。",
    look: "和空指针比时用 NULL 或 nullptr。不要把指针和随便一个 int 相比。",
    points: [
      { term: "指针", text: "里面是地址，不是普通数量。" },
      { term: "空指针", text: "表示不指向任何对象。用 NULL 或 nullptr，而不是一个业务上的整数。" }
    ] },
  { lang: "C/C++", name: "cast from pointer to integer of different size", test: /cast from pointer to integer of different size/, title: "指针转成整数时宽度不一样",
    meaning: "指针和你要转成的整数类型不是同一种宽度，地址会被截断。",
    look: "需要保存地址时，用足够宽的整数类型，例如 uintptr_t。不要随便转成 int。",
    points: [
      { term: "指针宽度", text: "32 位和 64 位程序里，指针占的字节可能不同。" },
      { term: "uintptr_t", text: "专门用来装地址的无符号整数类型。" }
    ] },
  { lang: "C/C++", name: "cast to pointer from integer of different size", test: /cast to pointer from integer of different size/, title: "整数转成指针时宽度不一样",
    meaning: "一个较窄或较宽的整数被当成了地址。",
    look: "不要把普通 int 硬转成指针。地址应该来自取地址、分配，或足够宽的整数类型。",
    points: [
      { term: "地址从哪来", text: "指针里应该是合法地址，不是一个随便的整数。" },
      { term: "宽度要够", text: "整数装不下完整地址时，转出来的指针是坏的。" }
    ] },
  { lang: "C/C++", name: "function definition is not allowed here", test: /function definition is not allowed here/, title: "这里不能写函数定义",
    meaning: "函数体出现在了不允许定义函数的位置。",
    look: "把函数定义移到其他函数外面，或类的外部。不要在普通语句中间嵌一套函数体。",
    points: [
      { term: "函数定义", text: "带函数体的那一份。" },
      { term: "声明可以更灵活", text: "只写原型、不写函数体时，能出现的位置和定义不一样。" }
    ] },
  { lang: "C/C++", name: "extraneous closing brace", test: /extraneous closing brace/, title: "多了一个右大括号",
    meaning: "这里的 } 没有对应的 {。",
    look: "从这一行往上配大括号。删掉多出来的那个，或补上缺少的左括号。",
    points: [
      { term: "右大括号", text: "它只能关上一个已经打开的块。" },
      { term: "多一个就会错位", text: "后面的函数和声明都会被看成位置不对。" }
    ] },
  { lang: "C/C++", name: "'for' loop initial declarations are only allowed in C99 mode", test: /'for' loop initial declarations are only allowed in C99 mode/, title: "这个 C 标准不允许在 for 里声明变量",
    meaning: "写成了 for (int i = 0; ...)，但编译器用的是更老的 C 标准。",
    look: "把 int i 挪到 for 前面，或让编译器使用 C99 及以后的标准。",
    points: [
      { term: "for 的初始化", text: "新标准允许在括号里声明循环变量。" },
      { term: "标准开关", text: "编译参数决定接受哪一版语言。老标准会拒绝这种写法。" }
    ] },
  { lang: "C/C++", name: "crosses initialization of", test: /crosses initialization of/, title: "跳转越过了变量的初始化",
    meaning: "switch 或 goto 会跳过某条声明的初始化，直接进入它的作用域。",
    look: "把变量声明挪到 switch 外面，或放进每个 case 自己的大括号里。",
    points: [
      { term: "初始化不能被跳过", text: "声明时带了初值，每条进入这条作用域的路都应该经过它。" },
      { term: "case 里的声明", text: "要用大括号把这个 case 包成一块，避免跳进别的 case。" }
    ] },
  { lang: "C/C++", name: "variable-sized object may not be initialized", test: /variable-sized object may not be initialized/, title: "变长数组不能在声明时初始化",
    meaning: "数组长度要到运行时才知道，又在声明处写了初值。",
    look: "先声明变长数组，再用循环赋值。或者改成固定长度。",
    points: [
      { term: "变长数组", text: "长度用变量决定，不是编译期常量。" },
      { term: "初始化列表", text: "那种花括号初值只适用于编译期就能确定的数组。" }
    ] },
  { lang: "C/C++", name: "initializer element is not constant", test: /initializer element is not constant/, title: "初始化列表里要用常量",
    meaning: "全局或静态对象的初值必须在编译期就能确定。",
    look: "把非常量的计算挪到函数里再赋值，或改用编译期常量。",
    points: [
      { term: "静态存储", text: "全局变量、static 变量在程序开始前就要有初值。" },
      { term: "编译期常量", text: "字面量、枚举、const 整数表达式才行。函数调用通常不行。" }
    ] },
  { lang: "C/C++", name: "excess elements in array initializer", test: /excess elements in array initializer/, title: "初始化列表里的元素太多了",
    meaning: "花括号里的值比数组能装的个数多。",
    look: "让值的个数不超过数组长度。长度写少了，就把长度改大。",
    points: [
      { term: "初始化列表", text: "用 { } 按顺序给数组元素初值。" },
      { term: "个数", text: "不能比声明的元素个数更多。" }
    ] },
  { lang: "C/C++", name: "field 'a' has incomplete type", test: /field '.+' has incomplete type/, title: "结构体字段的类型不完整",
    meaning: "字段用了一个还只有名字、没有完整定义的类型，编译器不知道这个字段多大。",
    look: "在这个结构体之前给出那个类型的完整定义。指针字段可以只靠前向声明。",
    points: [
      { term: "字段要有大小", text: "结构体自己的大小，等于各字段大小加起来。" },
      { term: "指针可以不完整", text: "指针的大小是固定的，可以指向尚未定义完的结构体。" }
    ] },
  { lang: "C/C++", name: "array type has incomplete element type", test: /array type has incomplete element type/, title: "数组元素的类型不完整",
    meaning: "你在建数组，但元素类型还没有完整定义。",
    look: "先给出元素类型的完整定义，再声明数组。",
    points: [
      { term: "元素类型", text: "数组要知道每一格占多少字节。" },
      { term: "不能是不完整类型", text: "只有名字、没有字段的结构体不能当元素。" }
    ] },
  { lang: "C/C++", name: "invalid use of incomplete type", test: /invalid use of incomplete type/, rank: 2, title: "不完整类型被拿去用了",
    meaning: "这个类型只做了前向声明，就访问了它的成员或大小。",
    look: "在使用成员之前包含或写上完整定义。",
    points: [
      { term: "不完整类型", text: "编译器只知道有这个名字，还不知道里面有什么。" },
      { term: "要用成员先看定义", text: "点成员、算 sizeof，都需要完整类型。" }
    ] },
  { lang: "C/C++", name: "taking address of temporary", test: /taking address of temporary|taking address of rvalue/, title: "对临时对象取了地址",
    meaning: "你对一个马上就消失的临时值使用了 &。",
    look: "先把结果放进一个变量，再取那个变量的地址。",
    points: [
      { term: "临时对象", text: "表达式产生的值，语句结束就没了。" },
      { term: "地址要指向还活着的对象", text: "不要保存一个马上失效的地址。" }
    ] },
  { lang: "C/C++", name: "cannot convert 'int' to", test: /cannot convert '.+' to/, title: "这个类型不能转换成目标类型",
    meaning: "初始化或传参时，源类型到目标类型没有允许的转换。",
    look: "看 from 和 to。改成目标类型能接受的值，或写出明确且合理的转换。",
    points: [
      { term: "转换", text: "不是每种类型都能自动变成另一种。" },
      { term: "看两边", text: "报错会写出源类型和目标类型。" }
    ] },
  { lang: "C/C++", name: "no viable conversion", test: /no viable conversion/, title: "没有可行的类型转换",
    meaning: "clang 认为从实际参数到形参，没有任何一种转换说得通。",
    look: "对照函数要的类型和你传入的类型。必要时先转换再传。",
    points: [
      { term: "viable", text: "表示编译器认为走得通的那条路。" },
      { term: "没有一条走得通", text: "重载和转换都试过了，仍然对不上。" }
    ] },
  { lang: "C/C++", name: "is not a class or namespace", test: /is not a class or namespace/, title: "这个名字不是类，也不是命名空间",
    meaning: "在这个名字后面写了 ::，但它不是类或命名空间。",
    look: "核对 :: 左边的名字。可能拼错，或它其实是一个变量。",
    points: [
      { term: "作用域解析", text: ":: 用来进入类或命名空间里的名字。" },
      { term: "左边必须是范围", text: "普通变量、整数不能后面接 ::。" }
    ] },
  { lang: "C/C++", name: "wrong number of template arguments", test: /wrong number of template arguments/, title: "模板参数的个数不对",
    meaning: "使用模板时，给出的类型或值参数个数和声明不一致。",
    look: "对照模板声明，补上或删掉多余的参数。",
    points: [
      { term: "模板参数", text: "写在尖括号里的类型或常量。" },
      { term: "个数要一致", text: "声明要几个，使用时就给几个。能推断的可以省略，不能推断的不行。" }
    ] },
  { lang: "C/C++", name: "no type named 'T' in", test: /no type named '.+' in/, title: "这个范围里没有那个类型名",
    meaning: "你在某个类或命名空间里找一个类型，那里没有这个名字。",
    look: "核对命名空间和嵌套类。拼写、所属的类都要对。",
    points: [
      { term: "嵌套类型", text: "类型可以定义在另一个类里面。" },
      { term: "要写对所属", text: "A::B 表示 A 里面的 B。A 里没有 B 就会失败。" }
    ] },
  { lang: "C/C++", name: "std::bad_alloc", test: /std::bad_alloc/, title: "内存分配失败了",
    meaning: "new 没有得到足够的内存。",
    look: "看是不是一次要了过大的块，或程序已经把内存耗尽。",
    points: [
      { term: "new", text: "为对象申请内存。失败时会抛出 bad_alloc。" },
      { term: "不要一次要太大", text: "长度来自变量时，先确认它是合理的正数。" }
    ] },
  { lang: "C/C++", name: "std::out_of_range", test: /std::out_of_range/, title: "C++ 标准库发现下标越界了",
    meaning: "vector::at 或类似函数发现位置不在合法范围内。",
    look: "下标必须小于 size()。不确定时先看 size，或改用不会检查的 [] 之前自己保证范围。",
    points: [
      { term: "at", text: "会检查下标，越界就抛异常。" },
      { term: "size", text: "合法位置是 0 到 size() - 1。" }
    ] },
  { lang: "C/C++", name: "return type defaults to 'int'", test: /return type defaults to 'int'/, title: "函数没有写返回类型，被当成了 int",
    meaning: "老的 C 规则里，没写返回类型就默认 int。这通常不是你想要的，新标准也会拒绝。",
    look: "明确写出返回类型。没有返回值就写 void。",
    points: [
      { term: "返回类型", text: "要写在函数名前面。" },
      { term: "不要省略", text: "靠默认 int 会让调用方和定义对不上。" }
    ] },
  { lang: "C/C++", name: "passing argument 1 of 'f' from incompatible pointer type", test: /passing argument \d+ of '.+' from incompatible pointer type/, title: "传给函数的指针类型不对",
    meaning: "这个参数位置要一种指针，你传了另一种不兼容的指针。",
    look: "看函数声明里的参数类型，和实参的类型。不要把一种对象的指针硬传成另一种。",
    points: [
      { term: "不兼容指针", text: "指向不同类型的指针，不能随便互换。" },
      { term: "第几个参数", text: "argument 后面的数字，就是从左数的参数位置。" }
    ] },
  { lang: "C/C++", name: "lvalue required as left operand of assignment", test: /lvalue required as left operand of assignment/, rank: 2, title: "赋值号左边不能被赋值",
    meaning: "等号左边是常量、表达式结果，或其他不能装值的东西。",
    look: "左边改成变量。如果只是想比较，用 ==，不要用 =。",
    points: [
      { term: "左值", text: "有存储位置、可以放进新值的东西。" },
      { term: "比较和赋值", text: "比较相等用 ==。单个 = 是把右边放进左边。" }
    ] },
  { lang: "C/C++", name: "lvalue required as increment operand", test: /lvalue required as increment operand/, rank: 2, title: "自增或自减的对象不能被修改",
    meaning: "++ 或 -- 用在了不能修改的表达式上。",
    look: "对变量做自增。不要对 a + 1 这种临时结果做 ++。",
    points: [
      { term: "自增", text: "要把对象里的值改大。对象必须能被修改。" },
      { term: "临时结果不行", text: "运算结果没有一个可改的变量位置。" }
    ] },
  { lang: "C/C++", name: "no match for 'operator", test: /no match for 'operator/, rank: 2, title: "没有匹配的运算符重载",
    meaning: "这次运算找不到参数类型对得上的运算符。",
    look: "看运算符两边的类型。字符串、自定义类不能默认用所有运算符。",
    points: [
      { term: "运算符重载", text: "类可以定义自己的 +、==、[] 等。没定义就不能那样用。" },
      { term: "内置类型的规则", text: "指针、整数各有能做和不能做的运算。" }
    ] },
  { lang: "C/C++", name: "warning: division by zero", test: /warning: division by zero/, rank: 2, title: "除数是 0",
    meaning: "这是编译器已经能看出的除以 0。",
    look: "不要写死一个 0 当除数。除数来自变量时，运行前也要判断它不是 0。",
    points: [
      { term: "编译期就能看见", text: "除数是常量 0 时，编译器直接指出来。" },
      { term: "整数除法", text: "整数除以 0 没有结果。" }
    ] },
  { lang: "C/C++", name: "AddressSanitizer", test: /AddressSanitizer/, title: "内存检查工具发现了非法访问",
    meaning: "程序在用 AddressSanitizer 运行时，碰到了越界、释放后使用或其他非法内存操作。",
    look: "看它下面更具体的那一句，例如 heap-use-after-free 或 buffer-overflow，再对回源码行号。",
    points: [
      { term: "Sanitizer", text: "编译时加上的检查器，专门抓内存错误。" },
      { term: "先看具体类型", text: "总标题下面会写清是越界、释放后再用，还是别的。" }
    ] },
  { lang: "C/C++", name: "heap-use-after-free", test: /heap-use-after-free/, rank: 2, title: "释放之后还在使用这块堆内存",
    meaning: "free 或 delete 之后，指针又被拿去读或写。",
    look: "释放后把指针置空，或确保没有别的地方还留着这只指针。",
    points: [
      { term: "释放后使用", text: "内存已经还给系统，原来的指针不能再碰。" },
      { term: "悬空指针", text: "它还存着旧地址，但那块内存已经不属于你。" }
    ] },
  { lang: "C/C++", name: "heap-buffer-overflow", test: /heap-buffer-overflow/, rank: 2, title: "堆上的缓冲区写或读越界了",
    meaning: "访问超过了 malloc、new 得到的那一块的长度。",
    look: "核对长度和下标。循环的上限不能超过分配时的元素个数。",
    points: [
      { term: "堆", text: "malloc 和 new 得到的内存。" },
      { term: "长度", text: "分配了 n 个，合法下标只有 0 到 n-1。" }
    ] },
  { lang: "C/C++", name: "stack-buffer-overflow", test: /stack-buffer-overflow/, rank: 2, title: "栈上的数组越界了",
    meaning: "局部数组被写出了它的长度，覆盖了旁边的栈数据。",
    look: "看数组长度和写入下标。不要用 gets 这类不限制长度的读取。",
    points: [
      { term: "栈上的数组", text: "写在函数里的普通数组，空间就在栈上。" },
      { term: "越界会破坏旁边", text: "多写的字节会盖住返回地址或其他变量。" }
    ] },
  { lang: "C/C++", name: "Aborted (core dumped)", test: /Aborted \(core dumped\)/, title: "程序调用了中止",
    meaning: "常见是 assert 失败，或 C++ 异常没有人接住，进程被主动中止。",
    look: "看中止前的那一句。如果是 assert，就看那个条件为什么是假。",
    points: [
      { term: "abort", text: "立刻结束进程。" },
      { term: "和段错误不同", text: "这是程序或库主动中止，不一定是访问了坏地址。" }
    ] },
  { lang: "C/C++", name: "double free or corruption", test: /double free or corruption/, title: "同一块内存被释放了两次，或堆已经被破坏",
    meaning: "free 或 delete 了已经释放过的指针，或更早的越界把堆信息写坏了。",
    look: "每一块内存只释放一次。释放后不要再 free 同一只指针。",
    points: [
      { term: "双重释放", text: "第二次 free 同一个地址是非法的。" },
      { term: "堆损坏", text: "更早的越界写入，也可能到释放时才爆出来。" }
    ] },
  { lang: "C/C++", name: "free(): invalid pointer", test: /free\(\): invalid pointer/, title: "free 收到的不是可释放的指针",
    meaning: "传给 free 的地址不是 malloc 交出来的，或已经坏了。",
    look: "只 free 你 malloc 得到的指针。不要 free 栈上数组，也不要 free 已经放过的指针。",
    points: [
      { term: "malloc 和 free 成对", text: "谁分配，谁用对应的方式释放。" },
      { term: "栈内存不能 free", text: "普通局部数组不需要、也不能 free。" }
    ] },
  { lang: "C/C++", name: "corrupted size vs. prev_size", test: /corrupted size vs\. prev_size/, title: "堆的内部记录已经被破坏",
    meaning: "通常是更早的越界写坏了堆块信息，释放或再次分配时才被发现。",
    look: "回溯最近的数组写入和指针运算。问题往往不在报错的这一行。",
    points: [
      { term: "堆元数据", text: "分配器在每块内存旁边记着大小。" },
      { term: "报错点可能偏后", text: "真正写坏的地方，可能在这次 free 之前。" }
    ] },
  { lang: "Java", name: "SocketTimeoutException", test: /SocketTimeoutException/, title: "套接字等待超时了",
    meaning: "连接或读写在限定时间内没有完成。",
    look: "看对方服务是否太慢、地址是否可达。超时时间是否短得不合理。",
    points: [
      { term: "超时", text: "到点还没有结果，就按失败结束，避免一直等。" },
      { term: "和拒绝连接不同", text: "拒绝是对方立刻不接受。超时是等了很久仍然没有完成。" }
    ] },
  { lang: "Java", name: "NotSerializableException", test: /NotSerializableException/, title: "这个对象不能被序列化",
    meaning: "你在把对象写成字节流，但它的类没有实现 Serializable。",
    look: "让这个类实现 Serializable，或不要把不能序列化的字段直接写出去。",
    points: [
      { term: "序列化", text: "把对象变成可以保存或传输的字节。" },
      { term: "Serializable", text: "一个标记接口。类声明实现它，才允许进入对象输出流。" }
    ] },
  { lang: "Java", name: "CloneNotSupportedException", test: /CloneNotSupportedException/, title: "这个对象不允许被克隆",
    meaning: "调用了 clone，但类没有实现 Cloneable，或克隆方法没有开放。",
    look: "需要复制时，先让类实现 Cloneable，或改用构造一个新对象的写法。",
    points: [
      { term: "clone", text: "按现有对象做出一份副本。" },
      { term: "Cloneable", text: "没有这个标记，Object 的 clone 会拒绝。" }
    ] },
  { lang: "Java", name: "SecurityException", test: /SecurityException/, title: "安全管理器拒绝了这个操作",
    meaning: "当前安全策略不允许读文件、连网络或执行这个动作。",
    look: "看被拒绝的权限。这是策略拦住了，不是语法错误。",
    points: [
      { term: "权限", text: "程序被允许做什么，可以由安全管理器限制。" },
      { term: "和编译错误不同", text: "代码能编译，运行时才被政策拒绝。" }
    ] },
  { lang: "Python", name: "StopAsyncIteration", test: /StopAsyncIteration/, title: "异步迭代已经结束了",
    meaning: "异步生成器没有下一个值了，还在继续取。",
    look: "用 async for 遍历。它会在结束时停下，不必自己再要下一项。",
    points: [
      { term: "异步迭代", text: "每次取出下一项都可能要等待。" },
      { term: "结束信号", text: "没有更多项时，用这个异常表示迭代完成。" }
    ] },
  { lang: "Python", name: "generator didn't stop after throw()", test: /generator didn't stop after throw\(\)/, title: "生成器在收到退出后没有停干净",
    meaning: "生成器被关闭或抛入异常后，又继续产出了值。",
    look: "收到 GeneratorExit 后不要再 yield。清理工作放在 finally，且不要再产出。",
    points: [
      { term: "GeneratorExit", text: "生成器被关闭时收到的信号。" },
      { term: "不要再 yield", text: "关闭过程中再产出值，解释器会认为生成器没有正确停下。" }
    ] },
  { lang: "Python", name: "cannot unpack non-iterable NoneType object", test: /cannot unpack non-iterable NoneType object/, rank: 2, title: "None 不能拆成多个变量",
    meaning: "左边在做拆包，右边是 None。函数可能没有返回元组。",
    look: "先确认返回值不是 None，再拆。没有结果时返回空元组，而不是什么都不返回。",
    points: [
      { term: "拆包", text: "a, b = 右边，要求右边能逐个给出值。" },
      { term: "None", text: "函数没有 return 时，结果是 None，不能拆。" }
    ] },
  { lang: "JavaScript", name: "Cannot mix BigInt and other types", test: /Cannot mix BigInt and other types/, title: "BigInt 不能和普通数字直接运算",
    meaning: "一边是 BigInt，另一边是 number。两种数字不能直接相加或比较。",
    look: "两边都变成 BigInt，或都变成普通 number。不要混在同一个运算符里。",
    points: [
      { term: "BigInt", text: "可以表示任意大的整数，和普通 number 不是同一种类型。" },
      { term: "先转换", text: "需要普通小数就用 Number。需要大整数就让两边都是 BigInt。" }
    ] },
  { lang: "JavaScript", name: "Right-hand side of 'instanceof' is not an object", test: /Right-hand side of 'instanceof' is not an object/, title: "instanceof 右边不是可构造的对象",
    meaning: "instanceof 右边应该是函数或类，你给了 null、数字或其他值。",
    look: "右边放构造函数或类。不要把一个已经创建好的实例放在右边。",
    points: [
      { term: "instanceof", text: "问左边是不是右边这个构造函数造出来的。" },
      { term: "右边是类型", text: "写 obj instanceof Date，不要写成 obj instanceof someDate。" }
    ] },
  { lang: "HTML", name: "Element script requires an end tag", test: /Element script requires an end tag/i, title: "script 标签没有结束",
    meaning: "script 不能只写开始标签。浏览器会把后面的内容都当成脚本。",
    look: "写上 <\/script>。脚本内容放在两个标签之间，或用 src 指向外部文件并仍然写上结束标签。",
    points: [
      { term: "script", text: "里面是脚本，不是普通文本。" },
      { term: "必须成对", text: "即使使用 src，也要有结束标签。" }
    ] },
  { lang: "CSS", name: "Unexpected unknown type selector", test: /Unexpected unknown type selector/i, rank: 2, title: "不认识这个标签选择器",
    meaning: "选择器里的标签名不是已知的元素，或被拼错了。",
    look: "核对标签名。自定义标签要符合你正在用的检查规则。",
    points: [
      { term: "类型选择器", text: "直接写标签名，例如 p、div、button。" },
      { term: "拼写", text: "div 写成 dvi 时，检查工具会认为没有这个元素。" }
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

  function finish(kind, rule, text, tail) {
    var spot = locate(text, rule.lang);
    return {
      kind: kind,
      lang: rule.lang,
      tagClass: "",
      tag: "",
      title: rule.title,
      where: spot,
      meaning: rule.meaning,
      look: rule.look,
      raw: tail,
      points: rule.points || []
    };
  }

  function unknown(spot, tail) {
    return {
      kind: "unknown",
      lang: "",
      tagClass: "",
      tag: "",
      title: "未知报错！",
      where: spot,
      meaning: "已储存的错误里识别不了这条，可能是新类型的错误，也可能是语言选项选错了。",
      look: "请看下面这一行。它通常是原因本身。把其中的英文类型名记下来，再对回它指出的文件和行号。",
      raw: tail,
      points: READ_POINTS
    };
  }

  function explain(text, chosen) {
    var rawText = String(text || "").trim();
    var tail = lastLine(rawText);
    var useLang = chosen && chosen !== "auto" ? chosen : "";
    var spot = locate(rawText, useLang);
    if (!rawText) {
      return {
        kind: "empty",
        lang: "",
        tagClass: "",
        tag: "",
        title: "先贴内容",
        where: "",
        meaning: "上面的框是空的。",
        look: "可以只贴报错原因那一行，也可以贴整段。",
        raw: "",
        points: [
          { term: "贴整段", text: "从第一行贴到最后一行。只贴半句时，经常对不上。" }
        ]
      };
    }

    if (!useLang) return unknown(spot, tail);

    var own = only(collect(rawText, { lang: useLang, allowGeneric: true }));
    if (own) return finish("hit", own, rawText, tail);
    return unknown(spot, tail);
  }

  window.ERROR_TOOL = { detect: detect, locate: locate, explain: explain };
})();
