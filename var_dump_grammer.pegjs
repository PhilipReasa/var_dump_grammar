/**********************
 * The Starting point!
 **********************/
VAR_DUMP = ws dump:start_values ws {return dump}

//we only detect objects and arrays (no real point in finding primitives)
start_values = object / array

/**************
 * The object!
 *************/
//example: object(foo)#1 (1) { ["key"]=> int(1) }
object = object_constant_text "(" objectType:fully_qualified_object_name ")" "#" objectReference:object_reference ws "(" propertyCount:object_field_count ")" ws "{"
 ws values:object_key_value* ws "}" {return {type:"object", className:objectType, reference:objectReference, properties:propertyCount, values:values }}

//all objects start with the string "object"
object_constant_text = "object"

//object name including classes
fully_qualified_object_name = namespace:namespace_name* classname:object_name {return namespace.join('') + classname }

namespace_name = name:object_name "\\" { return name + "\\" }

//object names start with a letter/underscore, followed by a combination of letters, underscores, and numbers
object_name = firstChar:[a-zA-Z_] otherChars:[a-zA-Z_0-9]* {return firstChar + otherChars.join('')}

//the reference is just a number
object_reference = simple_number

//the number of properties the object has
object_field_count = simple_number

//objects contain key->value pairs
object_key_value = ws "[" key:object_key "]=>" ws value:value ws {return  {key:key, value:value}}

//keys are quoted, colon seperated, strings with an optional scope at the end
object_key = propertyString:object_property+ propertScope:object_property_scope? {return propertyString.join('') + (propertScope || "") }

//quoted colon seperated strings
object_property = quotation_mark objectText:object_sub_property quotation_mark colon:":"? {return objectText + (colon || "") }

object_sub_property = chars:char* { return chars.join('') }

//potential properties
object_property_scope = "private" / "protected" / "public"

/************
 * The array!
 ************/
//example: array(1) { ["key"]=> int(1) }
array = ws array_constant_text "(" count:array_field_count ") {" values:array_key_value* ws "}" ws {return {type: "array", count: count, values: values}}

//all arrays start with this text
array_constant_text = "array"

//count of the elements in the array
array_field_count = simple_number

//the key value part: ["key"]=> int(1)
array_key_value = ws "[" key:array_key "]=>" ws value:value ws { return {key: key, value: value }}

//array keys are numbers or strings
array_key = array_key_number / array_key_string
    
//array key strings are wrapped with quotes    
array_key_string = quotation_mark chars:char* quotation_mark { return chars.join(""); }

//array index's can be any integer
array_key_number = sign:"-"? number:simple_number { return (sign || "") + number }

/*************
 * Three main types of values: Objects, arrays, and primitives
 *************/
value = object 
	/ array
	/ primitives

primitives = string
	/ boolean
	/ integer
	/ float
	/ null

/**************
 * Strings
 **************/
//strings provide some extra data: string(length) "value"
string = ws string_constant_text "(" string_length ")" ws quotation_mark chars:char* quotation_mark ws { return { type:"string", value: chars.join("") }; }

string_constant_text = "string"

string_length = simple_number

char
  = unescaped
  / escape

escape         = "\\"
unescaped      = [^\0-\x1F\x22\x5C]

/****************
 * Other Primitives
 ****************/
boolean = TRUE / FALSE

TRUE = "bool(true)" { return {type:"boolean", value: true}; }

FALSE = "bool(false)" { return {type:"boolean", value: false}; }

integer = "int(" sign:"-"? number:simple_number ")" { return { type:"integer", value: (sign || "") + number } }

float = "float(" sign:"-"? numbers:[0-9]+ decimalPoint:"."? decimals:[0-9]* ")" { return { type:"float", value: (sign || "") + numbers.join('') + (decimalPoint || "") + decimals.join('') }; }

null = "NULL" { return { type: "NULL", value: "null" }; }

recursion = "*RECURSION*" { return { type: "RECURSION", value: "recursion" }; }

/********************
 * Helpers
 ********************/
quotation_mark = '"' {return ""}

ws "whitespace" = [ \t\n]*

simple_number = digits:[0-9]+ {return digits.join('')}