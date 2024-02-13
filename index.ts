import { Client, ClientOptions } from "@blockless/sdk/assembly/http";
import { JSON } from "@blockless/sdk/assembly/json";
import { Console, Time } from "as-wasi/assembly";

function generateCompletion(): string {
	// Create JSON payload
	let payload: JSON.Obj = new JSON.Obj();
	let data: JSON.Obj = new JSON.Obj();
	let containers: JSON.Arr = new JSON.Arr();
	let containersName: JSON.Str = new JSON.Str("hello-world");

	containers.push(containersName);

	payload.set("containers", containers);

	data.set("some", "input");
	payload.set("data", data);

	// Set up API client
	// '{"containers": ["hello-world"], "data": {"some": "input"}}'
	let headers: Map<string, string> = new Map();
	headers.set("Content-Type", "application/json");

	let clientOptions: ClientOptions = new ClientOptions(
		"http://127.0.0.1:4000",
		headers,
	);

	let client: Client = new Client(clientOptions);

	// Make API request
	let response = client.post("/api/jobs", payload.toString());
	let id = response.getString("id");

	if (id) {
		return id.toString();
	}

	return "";
}

// http://127.0.0.1:4000/api/jobs?id=e45b5ebc-c71e-4ab8-b10f-d1202e7fb16e
function getResult(id: string): void {
	let headers: Map<string, string> = new Map();
	headers.set("Content-Type", "application/json");

	let clientOptions: ClientOptions = new ClientOptions(
		"http://127.0.0.1:4000",
		headers,
	);

	let client: Client = new Client(clientOptions);

	// Make API request
	let response = client.getRaw(`/api/jobs?id=${id}`);

	Console.log(`${response.toString()}`);
}

const resultID = generateCompletion();

if (resultID !== null) {
	Time.sleep(1000000000);
	Time.sleep(1000000000);
	Time.sleep(1000000000);
	Time.sleep(1000000000);
	getResult(resultID);
}
