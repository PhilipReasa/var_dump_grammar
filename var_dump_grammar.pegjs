/**********************
 * The Starting point!
 **********************/
VAR_DUMP = ws dump:start_values ws {return dump}

//we only detect objects and arrays (no real point in finding primitives)
start_values = object / array

/**************
 * PHP objects
 *************/
//example: object(Namespace\foo)#1 (1) { ["key"]=> int(1) }
object = 
	object_constant_text "(" objectType:fully_qualified_object_name ")" //object(Namespace\foo)
	"#" objectReference:object_reference ws 							//#1
	"(" propertyCount:object_field_count ")" ws 						//(1)
	"{" ws values:object_key_value* ws "}" 								//{ ["key"]=> int(1) }
{ 
	return {
		type:"object", 
		className:objectType, 
		reference:parseInt(objectReference),
		properties:parseInt(propertyCount),
		values:values 
	};
}

object_constant_text = "object"

//object name including namespace
fully_qualified_object_name = 
	namespace:namespace_name* 
	classname:object_name 
{
	return { 
		namespace: namespace, 
		class: classname 
	}; 
}

//example: A\B\classname
namespace_name = name:object_name "\\" { return name }

//object names start with a letter/underscore, followed by a combination of letters, underscores, and numbers
object_name = 
	firstChar:[a-zA-Z_] 
	otherChars:[a-zA-Z_0-9]* 
{
	return firstChar + otherChars.join('');
}

object_reference = simple_number

object_field_count = simple_number

//objects contain key->value pairs
object_key_value = 
	ws "[" key:object_key "]=&gt;" 
	ws value:value ws 
{
	return  {
		property:key, 
		value:value
	};
}

//keys are quoted, colon seperated, strings with an optional scope at the end
object_key = 
	propertyString:object_property+ 
	propertyScope:object_property_scope? 
{
	return { 
		propertyChain: propertyString, 
		propertyScope: propertyScope 
	};
}

//quoted colon seperated strings (possibly including namespace slashes)
object_property = 
	quotation_mark 
	value:slashOrVariable+
	quotation_mark ":"? 
{
	return value.join('');
}

slashOrVariable = nameSpaceSlash:"\\"? objectText:variable 
{
	if(nameSpaceSlash !== null) {
		return nameSpaceSlash + objectText;
	} else {
		return objectText;
	} 
}


//potential properties
object_property_scope = 
	"private" / 
	"protected" / 
	"public"

/************
 * PHP arrays
 ************/
//example: array(1) { ["key"]=> int(1) }
array = 
	ws array_constant_text 				//array
	"(" count:array_field_count ") {" 	//(1) {
	values:array_key_value* ws 			//["key"]=> int(1)
	"}" ws 								//}
{
	return {
		type: "array", 
		count: parseInt(count),
		values: values
	}
}

array_constant_text = "array"

array_field_count = simple_number

//the key value part: ["key"]=> int(1)
array_key_value = 
	ws key:array_key 
	ws value:value ws 
{ 
	return {
		key: key, 
		value: value 
	}
}

//array keys are numbers or strings
array_key = 
	array_key_number / 
    array_key_string
    
//array key strings are wrapped with quotes    
array_key_string = 
	"[" quotation_mark 				//["
	chars:array_key_string_char* 	//key
	quotation_mark+ "]=&gt;" 		//"]=>
{ 
	return chars.join(""); 
}

array_key_string_char = 
	array_key_string_char_type1 /
	array_key_string_char_type2 / 
	array_key_string_char_type3 / 
	array_key_string_char_type4 /
	array_key_string_char_type5 /
	array_key_string_char_type6 /
	array_key_string_char_type7

array_key_string_char_type1 = [\"][\]][=][&][g][t] val:[^;]
{
	return "\"]=&gt" + val;
}

array_key_string_char_type2 = [\"][\]][=][&][g] val:[^t]
{
	return "\"]=&g" + val;
}

array_key_string_char_type3 = [\"][\]][=][&] val:[^g]
{
	return "\"]=&" + val;
}

array_key_string_char_type4 = [\"][\]][=] val:[^&]
{
	return "\"]=" + val;
}

array_key_string_char_type5 = [\"][\]] val:[^=]
{
	return "\"]" + val;
}

array_key_string_char_type6 = [\"] val:[^\]]
{
	return "\"" + val;
}

array_key_string_char_type7 = values:[^\"]+
{
	return values.join('');
}

//array index's can be any integer
array_key_number = 
	"[" 					//[
	sign:"-"? 				//-
	number:simple_number 	//1
	"]=&gt;" 				//]=>
{ 
	return parseInt((sign || "") + number);
}

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
    / recursion

/**************
 * Strings
 **************/
//strings provide some extra data: string(length) "value"
string = 
	ws string_constant_text 			//string
	"(" length:string_length ")" 		//(1)
	ws stringValue:regular_string ws 	//"a"
{ 
	return { 
		type: "string", 
		length: length, 
		value: stringValue 
	};
}

string_constant_text = "string"

string_length = simple_number

regular_string = quotation_mark chars:string_chars* endingQuotes:quotation_mark+ 
{ 
	var toReturn = chars.join('');
	if(endingQuotes.length > 1) {
		for(var i = 1; i < endingQuotes.length; i++ ) {
			toReturn += "\"";
		}
	}

	return toReturn;
}

string_chars = 
	string_chars_type1 / 
	string_chars_type2 / 
	string_chars_type3 

string_chars_type1 = first_array:[\"]+ first_static:[\n] second_array:[ \t]* second_static:[^\[}] 
{
	var toReturn = "";
	toReturn += first_array.join('');
	toReturn += first_static;
	toReturn += second_array.join('');
	toReturn += second_static;
	
	return toReturn;	
}

string_chars_type2 = first_array:[\"]+ first_static:[^\n\"]
{
	var toReturn = "";
	toReturn += first_array.join('');
	toReturn += first_static;
	
	return toReturn;
}

string_chars_type3 = values:[^\"]+ 
{
	return values.join('');
}

/****************
 * Other Primitives
 ****************/
boolean = TRUE / FALSE

TRUE = "bool(true)" 
{ 
	return {
		type:"boolean", 
		value: true
	}; 
}

FALSE = "bool(false)" 
{ 
	return {
		type:"boolean", 
		value: false
	}; 
}

integer = "int(" sign:"-"? number:simple_number ")" 
{ 
	return { 
		type:"integer", 
		value: parseInt((sign || "") + number) 
	} 
}

float = "float(" sign:"-"? numbers:[0-9]+ decimalPoint:"."? decimals:[0-9]* sientificNotation:"E"? sientificNotationSign:[+\-]? sientificNotationDignits:[0-9]* ")" 
{ 
	var value = parseFloat((sign || "") + numbers.join('') + (decimalPoint || "") + decimals.join(''));
	if(sientificNotation) {
		value += "E" + sientificNotationSign + sientificNotationDignits.join('');
	}
	return { 
		type:"float", 
		value: value
	}; 
}

null = "NULL" 
{ 
	return { 
		type: "null", 
		value: "NULL" 
	}; 
}

recursion = "*RECURSION*" 
{ 
	return { 
		type: "recursion",
		value: "RECURSION"
	};
}

variable = varaibleNameFirst:[a-zA-Z_\x7f-\xff] variableNameOthers:[a-zA-Z0-9_\x7f-\xff]* 
{ 
	return varaibleNameFirst + variableNameOthers.join(''); 
} 

/********************
 * Helpers
 ********************/
quotation_mark = '"' {return ""}

ws "whitespace" = [ \t\n]* {return ""}

simple_number = digits:[0-9]+ {return digits.join('')}